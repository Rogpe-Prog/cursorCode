import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  age?: number;
  isActive: boolean;
  cel: string;
  userType: 'comprador' | 'recebedor' | 'ambos';
  address: string;
  availableStatus: boolean;
  credits: number;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Nome é obrigatório'],
      trim: true,
      minlength: [2, 'Nome deve ter pelo menos 2 caracteres'],
      maxlength: [50, 'Nome deve ter no máximo 50 caracteres'],
    },
    email: {
      type: String,
      required: [true, 'Email é obrigatório'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Email deve ter um formato válido',
      ],
    },
    password: {
      type: String,
      required: [true, 'Senha é obrigatória'],
      minlength: [6, 'Senha deve ter pelo menos 6 caracteres'],
      select: false, // Não incluir senha por padrão nas consultas
    },
    age: {
      type: Number,
      min: [0, 'Idade deve ser positiva'],
      max: [120, 'Idade deve ser menor que 120'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    cel: {
      type: String,
      required: [true, 'Celular é obrigatório'],
      trim: true,
      match: [
        /^[0-9]{10,11}$/,
        'Celular deve conter apenas números e ter 10 ou 11 dígitos',
      ],
    },
    userType: {
      type: String,
      required: [true, 'Tipo de usuário é obrigatório'],
      enum: {
        values: ['comprador', 'recebedor', 'ambos'],
        message: 'Tipo de usuário deve ser: comprador, recebedor ou ambos',
      },
    },
    address: {
      type: String,
      required: [true, 'Endereço é obrigatório'],
      trim: true,
      minlength: [10, 'Endereço deve ter pelo menos 10 caracteres'],
      maxlength: [200, 'Endereço deve ter no máximo 200 caracteres'],
    },
    availableStatus: {
      type: Boolean,
      default: true,
    },
    credits: {
      type: Number,
      default: 0,
      min: [0, 'Créditos não podem ser negativos'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (_doc, ret: any) {
        if (ret.password) {
          delete ret.password;
        }
        return ret;
      },
    },
  }
);

// Middleware para hash da senha antes de salvar
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Método para comparar senhas
userSchema.methods['comparePassword'] = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this['password']);
};

// Índices para performance
userSchema.index({ email: 1 });
userSchema.index({ isActive: 1 });
userSchema.index({ userType: 1 });
userSchema.index({ availableStatus: 1 });
userSchema.index({ cel: 1 });

export const User = mongoose.model<IUser>('User', userSchema);
