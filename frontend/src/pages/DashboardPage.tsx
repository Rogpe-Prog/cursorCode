import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <Container>
          <div className="navbar-brand d-flex align-items-center">
            <Logo size="sm" className="me-2" />
            <span className="ms-2">Dashboard</span>
          </div>
          <div className="navbar-nav ms-auto">
            <Button variant="outline-light" onClick={handleLogout}>
              Sair
            </Button>
          </div>
        </Container>
      </nav>

      <Container className="py-4">
        <Row>
          <Col>
            <h1 className="mb-4">Bem-vindo, {user?.name}!</h1>
          </Col>
        </Row>

        <Row>
          <Col md={6} className="mb-4">
            <Card>
              <Card.Header>
                <h5 className="mb-0">Informações do Usuário</h5>
              </Card.Header>
              <Card.Body>
                <p><strong>Nome:</strong> {user?.name}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Tipo:</strong> {user?.userType}</p>
                <p><strong>Celular:</strong> {user?.cel}</p>
                <p><strong>Endereço:</strong> {user?.address}</p>
                {user?.age && <p><strong>Idade:</strong> {user.age}</p>}
                <p><strong>Status:</strong> {user?.availableStatus ? 'Disponível' : 'Indisponível'}</p>
                <p><strong>Créditos:</strong> {user?.credits}</p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} className="mb-4">
            <Card>
              <Card.Header>
                <h5 className="mb-0">Ações Rápidas</h5>
              </Card.Header>
              <Card.Body>
                <p className="text-muted">Funcionalidades em desenvolvimento...</p>
                <Button variant="primary" disabled className="me-2">
                  Editar Perfil
                </Button>
                <Button variant="secondary" disabled>
                  Configurações
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DashboardPage;
