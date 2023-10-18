"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useRegisterModal from "@/app/hooks/useRegisterModel";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import {toast} from "react-hot-toast";
import Button from "../Button";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        registerModal.onClose();
      })
      .catch((error) => {
        toast.error('Algo deu Errado');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent=(
    <div className="fle flex-col gap-4">
    <Heading 
    title="Bem-vindo ao Airbnb"
    subtitle="Crie sua Conta"
    />
    <Input
      id="email"
      label="E-mail"
      disabled={isLoading}
      register={register}
      errors={errors}
      required
    />
    <Input
      id="name"
      label="Nome"
      disabled={isLoading}
      register={register}
      errors={errors}
      required
    />
    <Input
      id="password"
      label="Senha"
      disabled={isLoading}
      register={register}
      errors={errors}
      required
    />
    </div>
  )

  const footerContent = (
    <div className=" flex flex-col gap-4 mt-3 ">
      <hr />
      <Button
        outline
        label='Continue com google'
        icon={FcGoogle}
        onClick={()=>{}}
      />
       <Button
        outline
        label='Continue com github'
        icon={AiFillGithub}
        onClick={()=>{}}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="justify-center text-center flex flex-row items-center gap-2">
          <div >
            Já possui uma conta?
          </div>
          <div onClick={registerModal.onClose} className="text-neutral-800 cursor-pointer hover:underline">
            Acesse sua conta
          </div>
        </div>

      </div>
    </div>
  ) 

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Registre-se"
      actionLabel="Continuar"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
