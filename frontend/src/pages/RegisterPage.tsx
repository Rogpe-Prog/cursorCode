import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { validateForm, commonValidationRules, hasFormErrors } from '@/utils/validation';
import { FormErrors, RegisterRequest } from '@/types';
import Logo from '@/components/Logo';

const RegisterPage: React.FC = () => {
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<RegisterRequest & { confirmPassword: string }>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: undefined,
    cel: '',
    userType: 'comprador',
    address: '',
    availableStatus: true,
    credits: 0,
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string>('');

  // Regras de validação
  const validationRules = {
    name: [
      commonValidationRules.required('Nome é obrigatório'),
      commonValidationRules.minLength(2, 'Nome deve ter pelo menos 2 caracteres'),
      commonValidationRules.maxLength(50, 'Nome deve ter no máximo 50 caracteres'),
    ],
    email: [
      commonValidationRules.required('Email é obrigatório'),
      commonValidationRules.email('Email deve ter um formato válido'),
    ],
    password: [
      commonValidationRules.required('Senha é obrigatória'),
      commonValidationRules.password('Senha deve ter pelo menos 6 caracteres'),
    ],
    confirmPassword: [
      commonValidationRules.required('Confirmação de senha é obrigatória'),
      {
        validate: (value: string) => value === formData.password || 'As senhas não coincidem',
        message: 'As senhas não coincidem',
      },
    ],
    age: [
      {
        validate: (value: number) => !value || (value >= 0 && value <= 120) || 'Idade deve ser entre 0 e 120',
        message: 'Idade deve ser entre 0 e 120',
      },
    ],
    cel: [
      commonValidationRules.required('Celular é obrigatório'),
      commonValidationRules.phone('Celular deve conter apenas números e ter 10 ou 11 dígitos'),
    ],
    userType: [
      commonValidationRules.required('Tipo de usuário é obrigatório'),
    ],
    address: [
      commonValidationRules.required('Endereço é obrigatório'),
      commonValidationRules.minLength(10, 'Endereço deve ter pelo menos 10 caracteres'),
      commonValidationRules.maxLength(200, 'Endereço deve ter no máximo 200 caracteres'),
    ],
  };

  // Manipula mudanças nos campos
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    let processedValue: any = value;
    
    // Converte para número se necessário
    if (type === 'number') {
      processedValue = value === '' ? undefined : parseInt(value, 10);
    }
    
    // Converte para boolean se necessário
    if (name === 'availableStatus') {
      processedValue = (e.target as HTMLInputElement).checked;
    }

    setFormData(prev => ({
      ...prev,
      [name]: processedValue,
    }));
    
    // Limpa erro do campo quando o usuário começa a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Valida o formulário
  const validateFormData = (): boolean => {
    const newErrors = validateForm(formData, validationRules);
    setErrors(newErrors);
    return !hasFormErrors(newErrors);
  };

  // Manipula envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!validateFormData()) {
      return;
    }

    try {
      // Remove confirmPassword dos dados enviados
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);
      navigate('/dashboard');
    } catch (error: any) {
      setSubmitError(error.message || 'Erro ao registrar usuário');
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center bg-light py-4">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow">
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <Logo size="lg" className="mb-3" />
                  <h3 className="fw-bold text-primary">Cadastro</h3>
                  <p className="text-muted">Crie sua conta</p>
                </div>

                {submitError && (
                  <Alert variant="danger" className="mb-3">
                    {submitError}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Nome *</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          isInvalid={!!errors.name}
                          placeholder="Digite seu nome completo"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email *</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          isInvalid={!!errors.email}
                          placeholder="Digite seu email"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Senha *</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          isInvalid={!!errors.password}
                          placeholder="Digite sua senha"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Confirmar Senha *</Form.Label>
                        <Form.Control
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          isInvalid={!!errors.confirmPassword}
                          placeholder="Confirme sua senha"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.confirmPassword}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Idade</Form.Label>
                        <Form.Control
                          type="number"
                          name="age"
                          value={formData.age || ''}
                          onChange={handleChange}
                          isInvalid={!!errors.age}
                          placeholder="Digite sua idade"
                          min="0"
                          max="120"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.age}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Celular *</Form.Label>
                        <Form.Control
                          type="tel"
                          name="cel"
                          value={formData.cel}
                          onChange={handleChange}
                          isInvalid={!!errors.cel}
                          placeholder="Digite seu celular"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.cel}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Tipo de Usuário *</Form.Label>
                    <Form.Select
                      name="userType"
                      value={formData.userType}
                      onChange={handleChange}
                      isInvalid={!!errors.userType}
                    >
                      <option value="comprador">Comprador</option>
                      <option value="recebedor">Recebedor</option>
                      <option value="ambos">Ambos</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.userType}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Endereço *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      isInvalid={!!errors.address}
                      placeholder="Digite seu endereço completo"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.address}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      name="availableStatus"
                      checked={formData.availableStatus}
                      onChange={handleChange}
                      label="Status disponível"
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-100 mb-3"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Cadastrando...' : 'Cadastrar'}
                  </Button>
                </Form>

                <div className="text-center">
                  <p className="mb-0">
                    Já tem uma conta?{' '}
                    <Link to="/login" className="text-decoration-none">
                      Faça login aqui
                    </Link>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterPage;
