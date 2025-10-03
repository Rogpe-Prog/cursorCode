import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Badge, Modal } from 'react-bootstrap';
import { useAuth } from '@/hooks/useAuth';
import { receiverService, Receiver, SearchReceiversRequest } from '@/services/receiverService';


interface MessageModalProps {
  receiver: Receiver | null;
  show: boolean;
  onHide: () => void;
  onSendMessage: (message: string) => void;
}

const MessageModal: React.FC<MessageModalProps> = ({ receiver, show, onHide, onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
      onHide();
    }
  };

  if (!receiver) return null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Enviar mensagem para {receiver.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <strong>Endereço:</strong> {receiver.address}
        </div>
        <div className="mb-3">
          <strong>Celular:</strong> {receiver.cel}
        </div>
        <Form.Group>
          <Form.Label>Sua mensagem:</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ex: Olá! Gostaria de saber se você pode receber uma encomenda para mim no endereço..."
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSend} disabled={!message.trim()}>
          Enviar Mensagem
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const ReceiverSearch: React.FC = () => {
  const { user } = useAuth();
  const [searchAddress, setSearchAddress] = useState(user?.address || '');
  const [receivers, setReceivers] = useState<Receiver[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedReceiver, setSelectedReceiver] = useState<Receiver | null>(null);
  const [showMessageModal, setShowMessageModal] = useState(false);


  const searchReceivers = async () => {
    if (!searchAddress.trim()) {
      setError('Por favor, informe o endereço para busca');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const searchParams: SearchReceiversRequest = {
        address: searchAddress.trim(),
        radiusKm: 1,
      };

      const response = await receiverService.searchReceivers(searchParams);
      setReceivers(response.data.receivers);

      if (response.data.receivers.length === 0) {
        setError('Nenhum recebedor encontrado em um raio de 1km do endereço informado');
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao buscar recebedores');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (message: string) => {
    if (!selectedReceiver) return;

    try {
      await receiverService.sendMessage({
        receiverId: selectedReceiver._id,
        message,
      });
      alert(`Mensagem enviada para ${selectedReceiver.name}!`);
    } catch (error: any) {
      alert(`Erro ao enviar mensagem: ${error.message}`);
    }
  };

  const openMessageModal = (receiver: Receiver) => {
    setSelectedReceiver(receiver);
    setShowMessageModal(true);
  };

  // Verifica se o usuário é comprador ou ambos
  if (user?.userType === 'recebedor') {
    return (
      <Card>
        <Card.Header>
          <h5 className="mb-0">Buscar Recebedores</h5>
        </Card.Header>
        <Card.Body>
          <Alert variant="info">
            Você é um recebedor. Esta funcionalidade é apenas para compradores.
          </Alert>
        </Card.Body>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <Card.Header>
          <h5 className="mb-0">📦 Buscar Recebedores Próximos</h5>
          <small className="text-muted">Encontre pessoas para receber suas encomendas em um raio de 1km</small>
        </Card.Header>
        <Card.Body>
          <Form.Group className="mb-3">
            <Form.Label>Endereço para entrega:</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={searchAddress}
              onChange={(e) => setSearchAddress(e.target.value)}
              placeholder="Digite o endereço onde sua encomenda será entregue..."
            />
          </Form.Group>

          <Button 
            variant="primary" 
            onClick={searchReceivers}
            disabled={loading || !searchAddress.trim()}
            className="mb-3"
          >
            {loading ? 'Buscando...' : '🔍 Buscar Recebedores'}
          </Button>

          {error && (
            <Alert variant="danger" className="mb-3">
              {error}
            </Alert>
          )}

          {receivers.length > 0 && (
            <div>
              <h6 className="mb-3">
                {receivers.length} recebedor(es) encontrado(s):
              </h6>
              
              <Row>
                {receivers.map((receiver) => (
                  <Col md={6} lg={4} key={receiver._id} className="mb-3">
                    <Card className="h-100">
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="mb-0">{receiver.name}</h6>
                          <Badge bg={receiver.distance! <= 0.5 ? 'success' : 'warning'}>
                            {receiver.distance}km
                          </Badge>
                        </div>
                        
                        <p className="text-muted small mb-2">
                          📍 {receiver.address}
                        </p>
                        
                        <p className="text-muted small mb-2">
                          📱 {receiver.cel}
                        </p>
                        
                        <div className="d-flex justify-content-between align-items-center">
                          <small className="text-success">
                            💰 {receiver.credits} créditos
                          </small>
                          <Badge bg="info" className="ms-2">
                            {receiver.userType === 'ambos' ? 'Comprador + Recebedor' : 'Recebedor'}
                          </Badge>
                        </div>
                        
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="w-100 mt-2"
                          onClick={() => openMessageModal(receiver)}
                        >
                          💬 Enviar Mensagem
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </Card.Body>
      </Card>

      <MessageModal
        receiver={selectedReceiver}
        show={showMessageModal}
        onHide={() => setShowMessageModal(false)}
        onSendMessage={handleSendMessage}
      />
    </>
  );
};

export default ReceiverSearch;
