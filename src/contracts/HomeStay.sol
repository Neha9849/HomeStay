pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import "./safemath.sol";

/// @title main contract of homeStay
/// @author yaswanthsaivendra
contract HomeStay {
    using SafeMath for uint256;

    uint public roomCount;
    uint public bookingCount;
    address payable public owner;

    constructor() public {
        roomCount = 0;
        bookingCount = 0;
        owner = msg.sender;
    }

    mapping(address => Landlord) public landLordDetails;
    Room[] public rooms;
    Booking[] public bookings;
    // mapping(uint => Room) public rooms;
    // mapping (uint=>Booking) public bookings;

    struct Landlord {
        string name;
        string email;
        string contactNumber;
    }

    event LandlordCreated (
        address indexed _landlord,
        string _name,
        string _email,
        string _contactNumber
    );

    enum RoomType {Bungalow, Villa, Apartment, Penthouse, House}

    struct Location {
        string latitude;
        string longitude;
    }

    struct Room {
        uint roomId;    //we will have a room with id 0
        string roomName;
        RoomType roomType;
        string imgHashes;
        string description;
        address payable landlord;
        uint upVotes;
        uint rentPerDay;    //in wei, in frontend - ether
        uint8 numberOfGuestsCanStay;
        Location location;
    }

    event RoomCreated (
        uint _roomId,
        string _roomName,
        RoomType _roomType,
        address payable _landlord,
        uint _rentPerDay
    );

    enum BookingStatus { Booked , Refunded, CheckedIn}

    struct Booking {
        uint bookingId; //we will have a booking with id 0
        uint roomId;
        uint startTime;
        uint endTime;
        uint bookedAt;
        uint amount;
        uint totalDays;
        address payable landlord;
        address payable tenant;
        BookingStatus bookingStatus;
    }

    event Booked (
        uint _bookingId,
        uint _roomId,
        address payable indexed _landlord,
        address payable indexed _tenant,
        BookingStatus _bookingStatus
    );

     event BookingCancelled (
        uint _bookingId,
        uint _roomId,
        address payable indexed _landlord,
        address payable indexed _tenant,
        BookingStatus _bookingStatus
    );

    function createLandlordAccount(string memory _name, string memory _email, string memory _contactNumber) public returns(bool) {
        require(bytes(_name).length > 0);
        require(bytes(_email).length > 0);
        require(bytes(_contactNumber).length > 0);
        landLordDetails[msg.sender] = Landlord(_name, _email, _contactNumber);
        emit LandlordCreated(msg.sender, _name, _email, _contactNumber);
        return true;
    }

    function createRoom(string memory _roomName, uint8 _roomType, string memory _imgHashes, string memory _description, uint _rentPerDay, uint8 _numberOfGuestsCanStay, string memory _lat, string memory _long) public returns(bool){
        require(bytes(_roomName).length > 0);
        require(bytes(_description).length > 0);
        RoomType ourRoomType = RoomType(_roomType);
        rooms.push(Room(roomCount, _roomName, ourRoomType, _imgHashes , _description, msg.sender, 0, _rentPerDay, _numberOfGuestsCanStay, Location(_lat, _long)));
        emit RoomCreated(roomCount ,_roomName, ourRoomType, msg.sender, _rentPerDay);
        roomCount = roomCount.add(1);
        return true;
    }

    function getAllRooms() public view returns(Room[] memory) {
        return rooms;
    }

    // function getRoomsOfOwner()

    /// @notice function to book a room
    /// @dev We will take 1% ether of every booking payment so that it make up to the revenue of our app and this revenue generated can be used for gas fees for further transactions
    /// @param _startTime start time of our booking in seconds from unix timestamp
    /// @param _endTime end time of our booking in seconds from unix timestamp
    /// @return true returns a boolean true and emit an event if the booking got succeed
    function bookRoom(uint _roomId, uint _startTime, uint _endTime, address payable _landlord) payable public returns(bool) {
        require(_roomId < roomCount);
        require(rooms[_roomId].landlord == _landlord);
        // for(uint i=0; i < bookingCount-1; i++) {
        //     if(bookings[i].bookingStatus != BookingStatus.Refunded) {
        //         if(bookings[i].startTime <= _startTime){
        //         require(bookings[i].endTime <= _endTime);
        //         }
        //         else if(bookings[i].startTime >= _startTime){
        //             require(bookings[i].endTime >= _endTime);
        //         }
        //     }
        // }
        uint _days = _endTime.sub(_startTime);
        _days = _days.div(86400);
        require(_days*(rooms[_roomId].rentPerDay) == msg.value);
        uint _amount = msg.value;
        _amount = _amount.div(100);
        _amount = _amount.mul(99);
        BookingStatus _bookingStatus = BookingStatus.Booked;
        bookings.push(Booking(bookingCount, _roomId, _startTime, _endTime, block.timestamp, _amount, _days, _landlord, msg.sender, _bookingStatus));
        emit Booked(bookingCount, _roomId, _landlord, msg.sender, _bookingStatus);
        bookingCount = bookingCount.add(1);
        return true;

    }


    function getAllBookings() public view returns(Booking[] memory) {
        return bookings;
    }

    function cancelBooking(uint _bookingId) public payable returns(bool) {
        require(_bookingId < bookingCount);
        Booking memory _booking = bookings[_bookingId];
        require(_booking.bookingStatus == BookingStatus.Booked);
        require(_booking.startTime > block.timestamp);
        require(_booking.tenant == msg.sender);
        _booking.bookingStatus = BookingStatus.Refunded;
        uint amountToRefund = ((_booking.startTime - block.timestamp)*(100) * _booking.amount)/(_booking.startTime - _booking.bookedAt);
        msg.sender.transfer(amountToRefund);
        _booking.landlord.transfer(_booking.amount - amountToRefund);
        emit BookingCancelled(_bookingId, _booking.roomId, _booking.landlord, msg.sender, _booking.bookingStatus);
        return true;
    }

    // function checkIn
}