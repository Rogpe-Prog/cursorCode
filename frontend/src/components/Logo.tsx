import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'fs-4',
    md: 'fs-2',
    lg: 'display-4'
  };

  return (
    <div className={`text-center ${className}`}>
      <h1 className={`fw-bold text-primary mb-0 ${sizeClasses[size]}`}>
        📦 Recebeaí
      </h1>
      <p className="text-muted small mb-0">Sua plataforma de entregas</p>
    </div>
  );
};

export default Logo;
