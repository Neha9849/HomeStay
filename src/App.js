import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import Rooms from './components/Rooms/Rooms'
import Form from './components/Form/Form'
import Single from './components/Rooms/Single/Single'
import User from './components/User/User'
import Web3 from 'web3/dist/web3.min.js'
import { useEffect } from 'react'
import HomestayContract from './abis/HomeStay.json'
import { useState } from 'react'
function App() {
  const [account, setAccount] = useState('');
  const [contract,setContract] = useState({});
  const [rooms,setRooms] = useState([]);
  const [bookings,setBookings] = useState([]);
  const [url,setUrl]=useState('');
  useEffect(() => {
    const userUrl="/user/" + account;
    console.log(userUrl);
      setUrl(userUrl);
  },[account])
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
      setRooms(val=>([...val,...rooms]))
      const bookings= await contractObj.methods.getAllBookings().call({ from: account })
      setBookings(val=>([...val,...bookings]))
     
      

      
    }
  }, [])
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home  url={url}/>} />
         
          <Route path="/rooms" element={<Rooms  rooms={rooms} url={url}/>} />
          <Route path="/host" element={<Form account={account} contract={contract} url={url}/>} />
          <Route path="/room" element={<Single rooms={rooms} account={account} contract={contract} url={url} bookings={bookings}/>} />
          <Route path={url} element={<User account={account} contract={contract} bookings={bookings} url={url}/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
