import React, { Component } from 'react';
import Web3 from 'web3';

class Main extends Component {

  render() {
    return (
      <div id="content">
        <h1>Airdrop</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const price = window.web3.utils.toWei(this.TransferPrice.value.toString(), 'Ether')
          const addr = this.Addre.value
          this.props.Method_Transfer(addr, price)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="Addre"
              type="text"
              ref={(input) => { this.Addre = input }}
              className="form-control"
              placeholder="Address"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="TransferPrice"
              type="text"
              ref={(input) => { this.TransferPrice = input }}
              className="form-control"
              placeholder="Rin"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Airdrop</button>
        </form>


        <p>&nbsp;</p>
        <h1>Create Product</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
		  const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
          const name = this.productName.value
          this.props.Method_Product_Creation(name, price)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="productName"
              type="text"
              ref={(input) => { this.productName = input }}
              className="form-control"
              placeholder="Product Name"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productPrice"
              type="text"
              ref={(input) => { this.productPrice = input }}
              className="form-control"
              placeholder="Product Price"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Add Product</button>
        </form>
        <p>&nbsp;</p>
        <h2>Buy Product</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Owner</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="productList">
            { this.props.products.map((product, key) => {
              return(
                <tr key={key}>
                  <th scope="row">{product.id.toString()}</th>
                  <td>{product.name}</td>
                  <td>{window.web3.utils.fromWei(product.price.toString(), 'ether')} Rin</td>
                  <td>{product.owner}</td>
                  <td>
                    { !product.purchased
                      ? <button
                          name={product.id}
                          value={product.price}
                          onClick={(event) => {
                            this.props.Method_Product_Purchase(event.target.name, event.target.value)
                          }}
                        >
                          Purchase
                        </button>
                      : null
                    }
                    </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;
