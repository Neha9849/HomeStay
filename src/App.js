import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import AddRoom from './components/AddRoom/AddRoom'
import Rooms from './components/Rooms/Rooms'
import Form from './components/Form/Form'
import Single from './components/Rooms/Single/Single'
import Web3 from 'web3/dist/web3.min.js'
import { useEffect } from 'react'
import HomestayContract from './abis/HomeStay.json'
import { useState } from 'react'
function App() {
  const [account, setAccount] = useState('');
  const [contract,setContract] = useState({});
  useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
        init()
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
        init()
      } else {
        window.alert(
          'Non-Ethereum browser detected. You should consider trying MetaMask!',
        )
      }
    }

    loadWeb3()
    const init = async () => {
      const web3 = window.web3
      const id = await web3.eth.net.getId()
      const network = HomestayContract.networks[id]

      web3.eth.getAccounts().then((accounts) => {
        setAccount(accounts[0])
      })
      const contractObj = new web3.eth.Contract(
        HomestayContract.abi,
        network.address,
      )
      setContract(contractObj);
      const rooms = await contractObj.methods.getAllRooms().call({ from: account })
      // console.log(rooms)
    }
  }, [])
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddRoom />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/host" element={<Form account={account} contract={contract}/>} />
          <Route path="/room" element={<Single />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
