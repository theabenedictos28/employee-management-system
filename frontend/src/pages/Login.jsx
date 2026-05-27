import {
    Card,
    Form,
    Input,
    Button,
    Typography,
    message
} from "antd";

import { useNavigate } from "react-router-dom";
import api from "../api/api";

const { Title } = Typography;

function Login() {

    const navigate = useNavigate();

    const onFinish = async (values) => {

        try {

            const res = await api.post(
                "/auth/login",
                values
            );

            localStorage.setItem(
                "token",
                res.data.token
            );

            message.success("Login successful");

            navigate("/dashboard");

        } catch (err) {

            message.error(
                err.response?.data?.message ||
                "Login failed"
            );

        }

    };

    return (

        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#f0f2f5"
            }}
        >

            <Card
                style={{
                    width: 400,
                    borderRadius: 10
                }}
            >

                <Title level={2}>
                    Employee System
                </Title>

                <Form
                    layout="vertical"
                    onFinish={onFinish}
                >

                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Enter username"
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Enter password"
                            }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Button
                        type="primary"
                        block
                        htmlType="submit"
                    >
                        Login
                    </Button>

                </Form>

            </Card>

        </div>

    );

}

export default Login;