import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { loginUserSchema, type LoginFormData } from "../../schemas/auth.schema";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

type Props = {
  onSwitch: () => void;
};

export default function LoginForm({ onSwitch }: Props) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginUserSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);

      navigate("/");
    } catch (err) {
      console.error(err);

      if (err instanceof Error) {
        setError("root", {
          message: err.message,
        });
      } else {
        setError("root", {
          message: "Ocorreu um erro inesperado. Tente novamente.",
        });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 w-full max-w-md"
    >
      <div className="space-y-2">
        <h1 className="text-3xl font-bold font-playfair">Bem-vindo de volta</h1>

        <p className="text-gray-500">Entre para continuar explorando</p>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          className="flex items-center gap-2 justify-center shadow-sm p-4 w-1/2 cursor-pointer hover:bg-emerald-500 hover:text-white font-semibold rounded-md"
        >
          <FcGoogle size={25} />
          Google
        </button>

        <button
          type="button"
          className="flex items-center gap-2 justify-center shadow-sm p-4 w-1/2 cursor-pointer hover:bg-emerald-500 hover:text-white font-semibold rounded-md"
        >
          <FaFacebook size={25} />
          Facebook
        </button>
      </div>

      <p className="text-gray-500 text-sm text-center">ou continue com email</p>

      <div className="flex flex-col gap-2">
        <label className="font-semibold">Email</label>

        <div className="relative">
          <Mail className="absolute top-3 left-3 text-gray-500" />

          <input
            type="email"
            id="login-email"
            className="shadow w-full pl-12 py-3 pr-3 rounded-md"
            placeholder="seu@email.com"
            {...register("email")}
          />
        </div>

        {errors.email && (
          <span className="text-sm text-red-500">{errors.email.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-semibold">Senha</label>

        <div className="relative">
          <Lock className="absolute top-3 left-3 text-gray-500" />

          <input
            type={passwordVisible ? "text" : "password"}
            id="login-password"
            className="shadow w-full pl-12 py-3 pr-12 rounded-md"
            placeholder="••••••••"
            {...register("password")}
          />

          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute top-3 right-3 text-gray-500 cursor-pointer"
          >
            {passwordVisible ? <Eye /> : <EyeClosed />}
          </button>
        </div>

        {errors.password && (
          <span className="text-sm text-red-500">
            {errors.password.message}
          </span>
        )}
        {errors.root && (
          <span className="text-sm text-red-500">{errors.root.message}</span>
        )}
      </div>

      <button className="bg-emerald-500 w-full p-4 text-white font-semibold rounded-md hover:bg-emerald-500/90 cursor-pointer">
        {isSubmitting ? "Carregando..." : "Entrar"}
      </button>

      <p className="text-gray-500 text-center">
        Não tem uma conta?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="text-emerald-500 hover:underline"
        >
          Criar conta
        </button>
      </p>
    </form>
  );
}
