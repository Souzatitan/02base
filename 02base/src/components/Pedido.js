import React, { useState } from 'react';
import calabresa from '../images/calabresa.jpeg';
import '../Pedido.css';

const pizzas = [
  {
    id: 1,
    name: 'Marguerita',
    image: calabresa,
    price: 20,
  },
  {
    id: 2,
    name: 'Calabresa',
    image: calabresa,
    price: 22,
  },
  {
    id: 3,
    name: 'Quatro Queijos',
    image: calabresa,
    price: 25,
  },
  {
    id: 4,
    name: 'Portuguesa',
    image: calabresa,
    price: 23,
  },
  {
    id: 5,
    name: 'Frango com Catupiry',
    image: calabresa,
    price: 24,
  },
];

const bebidas = [
  { id: 1, name: 'Cerveja', price: 8 },
  { id: 2, name: 'Água', price: 3 },
  { id: 3, name: 'Refrigerante 2L', price: 7 },
];

const OrderForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [delivery, setDelivery] = useState(false); // Novo estado para delivery
  const [selectedPizzas, setSelectedPizzas] = useState({});
  const [selectedBebidas, setSelectedBebidas] = useState({});

  const handleQuantityChange = (id, quantity) => {
    setSelectedPizzas({
      ...selectedPizzas,
      [id]: quantity,
    });
  };

  const handleBebidaQuantityChange = (id, quantity) => {
    setSelectedBebidas({
      ...selectedBebidas,
      [id]: quantity,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const orderDetails = {
      name,
      phone,
      address,
      delivery, // Adicionando o estado de entrega
      pizzas: Object.keys(selectedPizzas)
        .filter((id) => selectedPizzas[id] > 0)
        .map((id) => ({
          id,
          name: pizzas.find((pizza) => pizza.id === parseInt(id)).name,
          quantity: selectedPizzas[id],
        })),
      bebidas: Object.keys(selectedBebidas)
        .filter((id) => selectedBebidas[id] > 0)
        .map((id) => ({
          id,
          name: bebidas.find((bebida) => bebida.id === parseInt(id)).name,
          quantity: selectedBebidas[id],
        })),
    };
    console.log(orderDetails);
    // Enviar o pedido para o backend
  };

  const deliveryFee = delivery ? 10 : 0; // Taxa de entrega

  return (
    <form onSubmit={handleSubmit}>
      <h2>Pedido de Pizza e Bebida</h2>

      <label>
        Nome:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>

      <label>
        Telefone:
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </label>

      <label>
        Endereço:
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </label>

      <label>
        <input
          type="checkbox"
          checked={delivery}
          onChange={(e) => setDelivery(e.target.checked)}
        />
        <h3>Entrega (Taxa de R$ {deliveryFee.toFixed(2)})</h3>
      </label>

      <div className="pizza-selection">
        <h3>Pizzas</h3>
        {pizzas.map((pizza) => (
          <div key={pizza.id} className="pizza-item">
            <img src={pizza.image} alt={pizza.name} width="100" />
            <div>
              <h4>{pizza.name}</h4>
              <p>R$ {pizza.price.toFixed(2)}</p>
              <label>
                Quantidade:
                <input
                  type="number"
                  min="0"
                  value={selectedPizzas[pizza.id] || 0}
                  onChange={(e) =>
                    handleQuantityChange(pizza.id, parseInt(e.target.value) || 0)
                  }
                />
              </label>
            </div>
          </div>
        ))}
      </div>
        <br></br>
      <div className="bebida-selection">
        <h3>Bebidas</h3>
        {bebidas.map((bebida) => (
          <div key={bebida.id} className="bebida-item">
            <h4>{bebida.name}</h4>
            <p>R$ {bebida.price.toFixed(2)}</p>
            <label>
              Quantidade:
              <input
                type="number"
                min="0"
                value={selectedBebidas[bebida.id] || 0}
                onChange={(e) =>
                  handleBebidaQuantityChange(
                    bebida.id,
                    parseInt(e.target.value) || 0
                  )
                }
              />
            </label>
          </div>
        ))}
      </div>
        <br></br><br></br>
      

      {/* Resumo do pedido */}
      <div className="order-summary">
        <h3>Resumo do Pedido</h3>
        <p><strong>Nome:</strong> {name}</p>
        <p><strong>Telefone:</strong> {phone}</p>
        <p><strong>Endereço:</strong> {address}</p>
        <p><strong>Entrega:</strong> {delivery ? 'Sim' : 'Não'}</p>
        <p><strong>Taxa de Entrega:</strong> R$ {deliveryFee.toFixed(2)}</p>

        <h4>Pizzas:</h4>
        {Object.keys(selectedPizzas).map((id) => {
          const quantity = selectedPizzas[id];
          if (quantity > 0) {
            const pizza = pizzas.find((pizza) => pizza.id === parseInt(id));
            return (
              <p key={id}>
                {pizza.name}: {quantity} x R$ {pizza.price.toFixed(2)} = R$ {(quantity * pizza.price).toFixed(2)}
              </p>
            );
          }
          return null;
        })}

        <h4>Bebidas:</h4>
        {Object.keys(selectedBebidas).map((id) => {
          const quantity = selectedBebidas[id];
          if (quantity > 0) {
            const bebida = bebidas.find((bebida) => bebida.id === parseInt(id));
            return (
              <p key={id}>
                {bebida.name}: {quantity} x R$ {bebida.price.toFixed(2)} = R$ {(quantity * bebida.price).toFixed(2)}
              </p>
            );
          }
          return null;
        })}

        {/* Total */}
        <h4>
          Total: R$ {(
            Object.keys(selectedPizzas).reduce((acc, id) => {
              const quantity = selectedPizzas[id];
              const pizza = pizzas.find((pizza) => pizza.id === parseInt(id));
              return acc + (quantity * pizza.price);
            }, 0) + 
            Object.keys(selectedBebidas).reduce((acc, id) => {
              const quantity = selectedBebidas[id];
              const bebida = bebidas.find((bebida) => bebida.id === parseInt(id));
              return acc + (quantity * bebida.price);
            }, 0) + deliveryFee
          ).toFixed(2)}
        </h4>
      </div>
      <div className='container'>
      <button type="submit">Enviar Pedido</button>
      </div>
    </form>
  );
};

export default OrderForm;
