import React, { useEffect, useState } from "react";
import { Modal, ListGroup, Button } from "react-bootstrap";
import Backend from "../../backend";

const ModalClientAddress = (props) => {
  const [addresses, setAddresses] = useState([]);

  useEffect(()=> {
    Backend.get('/Accounts/getDatosCliente', {
      params: {
          idCliente: props.idClient
      }
  })
  .then(res => {
      setAddresses(res.data.map(r => {
          return {
              regionId: r.regionId,
              region: r.region,
              comunaId: r.comunaId,
              comuna: r.comuna,
              calle: r.calle
          }
      }));
  })
  .catch(err => {
      console.log(err);
  });
  }, []);

  const selectAddress = (regionId, comunaId, calle) => {
    props.updateAddress(regionId, comunaId,calle);
  }

  return (
    <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered {...props}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Direcciones cliente
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <ListGroup>
          {
            addresses.map((address) => (
              <ListGroup.Item key={address.regionId+address.comunaId+address.calle} style={{position: "relative", cursor: "pointer"}} onDoubleClick={() => selectAddress(address.regionId, address.comunaId, address.calle)}>
                Región {address.region}, {address.comuna}, {address.calle}
              </ListGroup.Item>
            ))
          }
      </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalClientAddress;