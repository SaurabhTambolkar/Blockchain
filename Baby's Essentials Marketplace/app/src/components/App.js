import React, { Component } from 'react';
import Web3 from 'web3'
import Marketplace from '../abis/Marketplace.json'
import Navbar from './Navbar'
import Main from './Main'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
	
	const cost = await web3.eth.getBalance(accounts[0])
	this.setState({ costs: cost })
	
    const networkId = await web3.eth.net.getId()
    const networkData = Marketplace.networks[networkId]
    if(networkData) {
      const marketplace = web3.eth.Contract(Marketplace.abi, networkData.address)
      this.setState({ marketplace })
      const productCount = await marketplace.methods.productCount().call()
      this.setState({ productCount })

        const cost = await marketplace.methods.balanceOf(accounts[0]).call()
        this.setState({ costs: cost })

	  
      for (var i = 1; i <= productCount; i++) {
        const product = await marketplace.methods.products(i).call()
        this.setState({
          products: [...this.state.products, product]
        })
      }
      this.setState({ loading: false})
    } else {
      window.alert('Marketplace contract not deployed to detected network.')
    }
  }
  
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      productCount: 0,
      products: [],
      loading: true,
	  costs: 0
    }

    this.Method_Product_Creation = this.Method_Product_Creation.bind(this)
    this.Method_Product_Purchase = this.Method_Product_Purchase.bind(this)
    this.Method_Transfer = this.Method_Transfer.bind(this)
  }
  
  Method_Product_Creation(name, price) {
    this.setState({ loading: true })
    this.state.marketplace.methods.Method_Product_Creation(name, price).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  Method_Product_Purchase(id, price) {
    this.setState({ loading: true })
    this.state.marketplace.methods.Method_Product_Purchase(id).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  Method_Transfer(addr, price) {
    this.setState({ loading: true })
    this.state.marketplace.methods.transfer(addr, price).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  render() {
    return (
      <div>
        <Navbar account={"Address : " + this.state.account} costs={"Balance : " +(this.state.costs)/ Math.pow(10, 18) + " Rin"} />
		<div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              { this.state.loading
                ? <div id="loader" className="text-center"><p className="text-center"><p>Looks Like transaction is in process </p> <button onClick={() => window.location.reload(false)}>Click to reload!</button></p></div>
                : 
				<Main
                  products={this.state.products}
                  Method_Product_Creation={this.Method_Product_Creation}
                  Method_Product_Purchase={this.Method_Product_Purchase} 
                  Method_Transfer={this.Method_Transfer}/>
              }
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
