import {
    Card,
    Form,
    Input,
    Button,
    Typography,
    message,
    Avatar,
    Space
} from "antd";

import {
    UserOutlined,
    LockOutlined,
    TeamOutlined
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import api from "../api/api";

const { Title, Text } = Typography;

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
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background:
                    "linear-gradient(135deg, #1677ff 0%, #69b1ff 100%)",
                padding: 20
            }}
        >

            <Card
                bordered={false}
                style={{
                    width: 420,
                    borderRadius: 24,
                    boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
                    overflow: "hidden"
                }}
                bodyStyle={{
                    padding: 40
                }}
            >

                {/* LOGO */}
                <div
                    style={{
                        textAlign: "center",
                        marginBottom: 32
                    }}
                >

                    <Avatar
                        size={72}
                        icon={<TeamOutlined />}
                        style={{
                            background: "#1677ff",
                            marginBottom: 16
                        }}
                    />

                    <Title
                        level={2}
                        style={{
                            marginBottom: 5
                        }}
                    >
                        Workbridge EMS
                    </Title>

                    <Text type="secondary">
                        Login to continue
                    </Text>

                </div>

                {/* FORM */}
                <Form
                    layout="vertical"
                    onFinish={onFinish}
                    size="large"
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

                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Enter username"
                            style={{
                                borderRadius: 10,
                                height: 48
                            }}
                        />

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

                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Enter password"
                            style={{
                                borderRadius: 10,
                                height: 48
                            }}
                        />

                    </Form.Item>

                    <Button
                        type="primary"
                        block
                        htmlType="submit"
                        size="large"
                        style={{
                            height: 48,
                            borderRadius: 10,
                            fontSize: 16,
                            fontWeight: 600,
                            marginTop: 10
                        }}
                    >
                        Login
                    </Button>

                </Form>

                {/* FOOTER */}
                <div
                    style={{
                        textAlign: "center",
                        marginTop: 28
                    }}
                >

                    <Space direction="vertical" size={2}>

                        <Text type="secondary">
                            Employee Management System
                        </Text>

                        <Text
                            type="secondary"
                            style={{
                                fontSize: 12
                            }}
                        >
                            Admin Panel Access
                        </Text>

                    </Space>

                </div>

            </Card>

        </div>

    );

}

export default Login;