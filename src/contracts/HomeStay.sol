pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import "./safemath.sol";

contract HomeStay {
    using SafeMath for uint256;

    uint public roomCount;
    uint public bookingCount;

    constructor() public {
        roomCount = 0;
        bookingCount = 0;
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
        address indexed _owner,
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
        address payable owner;
        uint upVotes;
        uint rentPerDay;    //in wei, in frontend - ether
        uint8 numberOfGuestsCanStay;
        Location location;
    }

    event RoomCreated (
        uint roomCount,
        string _roomName,
        RoomType _roomType,
        address payable _owner,
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
        address payable owner;
        address payable tenant;
        BookingStatus bookingStatus;
    }

    event Booked (
        uint _bookingId,
        uint _roomId,
        address payable indexed _owner,
        address payable indexed _tenant,
        BookingStatus _bookingStatus
    );

     event BookingCancelled (
        uint _bookingId,
        uint _roomId,
        address payable indexed _owner,
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
        roomCount = roomCount.add(1);
        emit RoomCreated(roomCount ,_roomName, ourRoomType, msg.sender, _rentPerDay);
        return true;
    }

    function getAllRooms() public view returns(Room[] memory) {
        return rooms;
    }

    // function getRoomsOfOwner()

    function bookRoom(uint _roomId, uint _startTime, uint _endTime, address payable _owner, uint8 _bookingStatus) payable external returns(bool) {
        require(_roomId < roomCount);
        require(rooms[_roomId].owner == _owner);
        for(uint i=0; i < bookingCount; i++) {
            if(bookings[i].bookingStatus != BookingStatus.Refunded) {
                if(bookings[i].startTime <= _startTime){
                require(bookings[i].endTime <= _endTime);
                }
                else if(bookings[i].startTime >= _startTime){
                    require(bookings[i].endTime >= _endTime);
                }
            }
        }
        uint _days = (_endTime - _startTime) / 60 / 60 / 24;
        require(_days*(rooms[_roomId].rentPerDay) == msg.value);
        BookingStatus _ourBookingStatus = BookingStatus(_bookingStatus);
        bookings.push(Booking(bookingCount, _roomId, _startTime, _endTime, block.timestamp, msg.value, _days, _owner, msg.sender, _ourBookingStatus));
        emit Booked(bookingCount, _roomId, _owner, msg.sender, _ourBookingStatus);
        bookingCount = bookingCount.add(1);
        return true;

    }


    function getAllBookings() public view returns(Booking[] memory) {
        return bookings;
    }

    function cancelBooking(uint _bookingId) public payable returns(bool) {
        require(_bookingId < bookingCount);
        require(bookings[_bookingId].bookingStatus == BookingStatus.Booked);
        require(bookings[_bookingId].startTime > block.timestamp);
        require(bookings[_bookingId].tenant == msg.sender);
        bookings[_bookingId].bookingStatus == BookingStatus.Refunded;
        uint amountToRefund = ((bookings[_bookingId].startTime - block.timestamp)*(100) * bookings[_bookingId].amount)/(bookings[_bookingId].startTime - bookings[_bookingId].bookedAt);
        msg.sender.transfer(amountToRefund);
        bookings[_bookingId].owner.transfer(bookings[_bookingId].amount - amountToRefund);
        emit BookingCancelled(_bookingId, bookings[_bookingId].roomId, bookings[_bookingId].owner, msg.sender, bookings[_bookingId].bookingStatus);
        return true;
    }

    // function checkIn
}