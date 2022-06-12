const { assert } = require('chai');
const { default: Web3 } = require('web3');

const HomeStay = artifacts.require("HomeStay");

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract("HomeStay", ([owner, landlord, tenant, helperAccount]) => {

    let homeStay;

    before(async () => {
        homeStay = await HomeStay.deployed();
    })

    describe("tests the landlord account creation", async () => {
      const name="homestay";
      const email="homestay@mail.com";
      const contactNumber = "+917777777777";
      it("tests for existence of canditate name", async() => {
        await homeStay.createLandlordAccount("", email, contactNumber).should.be.rejected;
      });
      it("tests for existence of canditate email", async() => {
        await homeStay.createLandlordAccount(name, "", contactNumber).should.be.rejected;
      });
      it("tests for existence of canditate contactNumber", async() => {
        await homeStay.createLandlordAccount(name, email, "").should.be.rejected;
      });
      it("checks for the return value", async () => {
        const returnValue = await homeStay.createLandlordAccount.call(name, email, contactNumber, { from : landlord});
        assert.equal(returnValue, true, "function should return true");
      });

      it("checks if the LandlordCreated event is emitted with correct values", async () => {
        const result = await homeStay.createLandlordAccount(name, email, contactNumber, { from : landlord});
        assert.equal(result.receipt.logs.length, 1, "should trigger one event");
        assert.equal(result.receipt.logs[0].args._name, name, "logs the landlord account name");
        assert.equal(result.receipt.logs[0].args._email, email, "logs the landlord account email");
        assert.equal(result.receipt.logs[0].args._contactNumber, contactNumber, "logs the landlord account contactNumber");
      });
      it("checks if landlord account is created or not", async () => {
        const landlordAccount = await homeStay.landLordDetails(landlord);
        assert.equal(landlordAccount.name, name);
        assert.equal(landlordAccount.email, email);
        assert.equal(landlordAccount.contactNumber, contactNumber);
      });
    });

    describe("tests the createRoom function", async () => {
      const roomName = "room";
      const roomType = 0;
      const imgHashes = "abc,123,1243,3dfs,wdffa";
      const description = "this is the description";
      let rentPerDay = 0.0005; //ether
      const numberOfGuestsCanStay = 2;
      const lat="533.423323";
      const long="233.80223";
      const state = "andhra";
      const country = "India";
      it("tests for existence of room name", async() => {
        await homeStay.createRoom("", roomType, imgHashes, description, web3.utils.toWei(rentPerDay.toString(), "ether"), numberOfGuestsCanStay, lat, long, state , country).should.be.rejected;
      });
      it("tests for existence of room description", async() => {
        await homeStay.createRoom(roomName, roomType, imgHashes,"", web3.utils.toWei(rentPerDay.toString(), "ether"), numberOfGuestsCanStay, lat, long, state, country).should.be.rejected;
      });

      it("checks for the return value", async() => {
        const returnValue = await homeStay.createRoom.call(roomName, roomType, imgHashes, description, web3.utils.toWei(rentPerDay.toString(), "ether"), numberOfGuestsCanStay, lat, long, state, country, {from : landlord});
        assert.equal(returnValue, true, "should return true");
      });
      it("checks if room is created", async () => {
        await homeStay.createRoom(roomName, roomType, imgHashes, description, web3.utils.toWei(rentPerDay.toString(), "ether"), numberOfGuestsCanStay, lat, long, state, country, {from : landlord});
        const room = await homeStay.rooms(0);
        assert.equal(room.roomName, roomName);
        assert.equal(room.roomType.toNumber(), roomType);
        assert.equal(room.imgHashes, imgHashes);
        assert.equal(room.description, description);
        assert.equal(room.rentPerDay.toNumber(), rentPerDay*1e18);
        assert.equal(room.numberOfGuestsCanStay, numberOfGuestsCanStay);
        assert.equal(room.location.latitude, lat);
        assert.equal(room.location.longitude, long);
      });
      it("checks if the RoomCreated event is emitted with correct values", async () => {
        const result = await homeStay.createRoom(roomName, roomType, imgHashes, description, web3.utils.toWei(rentPerDay.toString(), "ether"), numberOfGuestsCanStay, lat, long, state, country, {from : landlord});
        assert.equal(result.receipt.logs.length, 1, "should trigger one event");
        assert.equal(result.receipt.logs[0].event, "RoomCreated", "should trigger RoomCreated event");
        assert.equal(result.receipt.logs[0].args._roomName, roomName, "logs the room name");
        assert.equal(result.receipt.logs[0].args._roomType, roomType, "logs the room type");
        assert.equal(result.receipt.logs[0].args._rentPerDay.toNumber(), rentPerDay*1e18, "logs the rent per day");
        assert.equal(result.receipt.logs[0].args._landlord, landlord, "logs the landlord address");
      });
    });

    describe("tests the getAllRooms function", async () => {
      it("return all rooms data", async () => {
        const roomName = "room";
        const roomType = 0;
        const imgHashes = "abc,123,1243,3dfs,wdffa";
        const description = "this is the description";
        let rentPerDay = 0.0005; //ether
        const numberOfGuestsCanStay = 2;
        const lat="533.423323";
        const long="233.80223";
        const state = "telangana";
        const country = "India";

        const roomName1 = "noname";
        const roomType1 = 2;
        const imgHashes1 = "adagtagac,1ad23,12asd43,3dfs,wdffa";
        const description1 = "this is the 2nd room description";
        let rentPerDay1 = 0.0007; //ether
        const numberOfGuestsCanStay1 = 4;
        const lat1="233.322";
        const long1="423.80223";
        const state1 = "ANdhra";
        const country1 = "India";
        await homeStay.createRoom(roomName, roomType, imgHashes, description, web3.utils.toWei(rentPerDay.toString(), "ether"), numberOfGuestsCanStay, lat, long, state, country, {from : landlord});
        await homeStay.createRoom(roomName1, roomType1, imgHashes1, description1, web3.utils.toWei(rentPerDay1.toString(), "ether"), numberOfGuestsCanStay1, lat1, long1, state1, country1, {from : landlord});
        const returnValue = await homeStay.getAllRooms.call();
        // console.log(returnValue);
      });
    });


    describe("tests the bookRoom function", async () => {
      const roomId = 0;
      const startTime = 1749709800;
      const endTime = 1749882600;
      const rentPerDay = 0.0005;
      const days = 2;
      it("ensures that the room id is less than room count", async () => {
        await homeStay.bookRoom(1000, startTime, endTime, landlord, {from : tenant, value: web3.utils.toWei((rentPerDay*days).toString(), "ether") }).should.be.rejected;
      });
      it("ensures that the landlord provided is same as the room landlord", async () => {
        await homeStay.bookRoom(roomId, startTime, endTime, helperAccount, {from : tenant, value: web3.utils.toWei((rentPerDay*days).toString(), "ether") }).should.be.rejected;
      });
      it("ensures that the amount paid is same as the total room rent", async () => {
        await homeStay.bookRoom(roomId, startTime, endTime, landlord, {from : tenant, value: web3.utils.toWei((0.0006*days).toString(), "ether") }).should.be.rejected;
      });
      it("to ensure that the room is created", async () => {
        const result = await homeStay.bookRoom(roomId, startTime, endTime, landlord, {from : tenant, value: web3.utils.toWei((rentPerDay*days).toString(), "ether") });
        const booking = await homeStay.bookings(0);
        assert.equal(booking.roomId, roomId, "roomId");
        assert.equal(booking.landlord, landlord, "landlord");
        assert.equal(booking.startTime, startTime, "startTime");
        assert.equal(booking.tenant, tenant, "tenant");
        assert.equal(booking.bookingStatus, 0 , "bookingStatus");


        //to test the booking event
        assert.equal(result.receipt.logs.length, 1, "should trigger one event");
        assert.equal(result.receipt.logs[0].event, "Booked", "should trigger Booked event");
        assert.equal(result.receipt.logs[0].args._roomId, roomId, "logs the roomId");
        assert.equal(result.receipt.logs[0].args._landlord, landlord, "logs the landlord address");
        assert.equal(result.receipt.logs[0].args._tenant, tenant, "logs the tenant address");
        assert.equal(result.receipt.logs[0].args._bookingStatus, 0, "logs the bookingStatus");
      });
    });

    describe("tests the getAllbookings function", async () => {
      const roomId = 1;
      const startTime = 1750055400;
      const endTime = 1750401000;
      const rentPerDay = 0.0005;
      const days = 4;
      it("logs all the bookings", async () => {
        await homeStay.bookRoom(roomId, startTime, endTime, landlord, {from : tenant, value: web3.utils.toWei((rentPerDay*days).toString(), "ether") });
        const bookings = await homeStay.getAllBookings();
        // console.log(bookings);
      });
    });

    describe("checks the cancelBooking function", async () => {
      const bookingId = 0;
      it("ensures that the bookingId is less than booking count", async () => {
        await homeStay.cancelBooking(1000, {from : tenant}).should.be.rejected;
      });

      it("ensures that the event BookingCancelled is emited with correct values", async () => {
        const result = await homeStay.cancelBooking(bookingId, {from : tenant});
        // console.log(result);
        assert.equal(result.receipt.logs.length, 1, "should trigger one event");
        assert.equal(result.receipt.logs[0].event, "BookingCancelled", "should trigger BookingCancelled event");
        assert.equal(result.receipt.logs[0].args._roomId, 0, "logs the roomId");
        assert.equal(result.receipt.logs[0].args._landlord, landlord, "logs the landlord address");
        assert.equal(result.receipt.logs[0].args._tenant, tenant, "logs the tenant address");
        assert.equal(result.receipt.logs[0].args._bookingStatus, 1, "logs the bookingStatus");
        assert.equal(result.receipt.logs[0].args._bookingId, bookingId, "logs the bookingId");
      });
    });


})