import React, { useState } from "react";
import styled from 'styled-components';
import * as Yup from "yup";
import { withFormik, FormikProps, FieldArray } from "formik";
import { graphql } from "react-apollo";

import Button from "@material-ui/core/Button";

import { mainButtonStyle } from "../../../utils/styles/Button/Button";
import Form from "../../../utils/styles/Form/Form";
import Wrapper from "../../../utils/styles/Form/Wrapper";
import Input from "../../../utils/styles/Input/Input";
import Title from "../../../utils/styles/Title/Title";
import Error from "../../../utils/styles/Error/Error";
import LinkWrapper from "../../../utils/components/Link/Link";

import { addUser } from "../../../graphql/mutations";

const AddDispositivo = styled.h1`
    color: #00A7D1;
    text-decoration: uppercase;
    font-size: 1rem;
    font-weight: 600;
    font-family: "Poppins";
    font-weight: bold;
    line-height: normal;  
    align-self: flex-start;
    cursor: pointer;  
`;

const InputsWrapper = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;

interface FormValues {
    email: string;
    password: string;
    device: string;
}

interface OtherProps {
    title?: string;
    mutate?: any;
    history: any;
}

interface MyFormProps {
    initialEmail?: string;
    initialPassword?: string;
    initialDevice?: string;
    mutate?: any;
    history: any;
}

const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
    const [devices, addDevices] = useState([]);

    const addDevice = () => {
        console.log(devices)
    };

    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
    } = props;

    return (
        <Form onSubmit={handleSubmit}>
            <Title>Criar Conta</Title>
            <Input
                placeholder="Email"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
            />
            {touched.email && errors.email && <Error>{errors.email}</Error>}

            <Input
                placeholder="Senha"
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
            />
            {touched.password && errors.password && (
                <Error>{errors.password}</Error>
            )}

            <AddDispositivo onClick={addDevice}>Dispositivos</AddDispositivo>

            {
                devices.map(({ device, index }: any) => (
                    <Input
                        key={index}
                        placeholder="Senha"
                        type="device"
                        name="device"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={device}
                    />
                ))
            }

            {/* <Input
                placeholder="Dispositivo"
                type="device"
                name="device"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.device}
            />
            {touched.device && errors.device && (
                <Error>{errors.device}</Error>
            )} */}

            <Wrapper>
                <LinkWrapper to="/">Entrar</LinkWrapper>
                <Button
                    style={mainButtonStyle}
                    type="submit"
                    disabled={
                        isSubmitting ||
                        !!(errors.email && touched.email) ||
                        !!(errors.password && touched.password) ||
                        !!(errors.device && touched.device)
                    }
                >
                    Criar
                </Button>
            </Wrapper>
        </Form>
    );
};

// Wrap our form with the using withFormik HoC
const SignUpForm = withFormik<MyFormProps, FormValues>({
    mapPropsToValues: props => ({
        email: props.initialEmail || "",
        password: props.initialPassword || "",
        device: props.initialDevice || ""
    }),

    validationSchema: Yup.object().shape({
        email: Yup.string()
            .email("Email not valid")
            .required("Email is required"),
        password: Yup.string().required("Password is required"),
        device: Yup.number().required("Device is required")
    }),

    handleSubmit(
        { email, password, device }: FormValues,
        { props, setSubmitting, setErrors }
    ) {
        props
            .mutate({ variables: { input: { email, password, device } } })
            .then(({ data }: any) => {
                const { addUser } = data;

                if (addUser.token) {
                    localStorage.setItem("token", addUser.token);
                }
            })
            .then(() => props.history.push("/dispositivos"))
            .catch((error: string) => {
                console.log("error", error);
                setSubmitting(false);
                setErrors({ email: "", password: "" });
            });
    }
})(InnerForm);

//@ts-ignore
export default graphql(addUser)(SignUpForm);