const HomeStay = artifacts.require("HomeStay");

module.exports = function(deployer) {
  deployer.deploy(HomeStay);
};