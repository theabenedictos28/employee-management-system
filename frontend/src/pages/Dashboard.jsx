import { useEffect, useState } from "react";
import api from "../api/api";
import { message } from "antd";
import {
    Layout,
    Menu,
    Card,
    Row,
    Col,
    Button,
    Typography,
    Table,
    Space,
    Tag
} from "antd";

import {
    UserOutlined,
    DashboardOutlined,
    LogoutOutlined,
    TeamOutlined,
    DollarOutlined
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

function Dashboard() {
    const [employees, setEmployees] = useState([]);

    const navigate = useNavigate();

    
    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/");

    };

    const fetchEmployees = async () => {

    try {

        const res = await api.get("/employees");

        setEmployees(res.data);

    } catch (err) {

        console.log(err);

        message.error("Failed to fetch employees");

    }

};

useEffect(() => {

    fetchEmployees();

}, []);

    // TABLE COLUMNS
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id"
        },
        {
            title: "Full Name",
            dataIndex: "fullname",
            key: "fullname"
        },
        {
            title: "Department",
            dataIndex: "department",
            key: "department",
            render: (department) => (
                <Tag color="blue">
                    {department}
                </Tag>
            )
        },
        {
            title: "Salary",
            dataIndex: "salary",
            key: "salary",
            render: (salary) => `₱${salary.toLocaleString()}`
        },
        {
            title: "Action",
            key: "action",
            render: () => (
                <Space>
                    <Button type="primary">
                        Edit
                    </Button>

                    <Button danger>
                        Delete
                    </Button>
                </Space>
            )
        }
    ];

    return (

        <Layout style={{ minHeight: "100vh" }}>

            {/* SIDEBAR */}
            <Sider>

                <div
                    style={{
                        color: "white",
                        padding: 20,
                        fontSize: 22,
                        fontWeight: "bold",
                        textAlign: "center"
                    }}
                >
                    EMS
                </div>

                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    items={[
                        {
                            key: "1",
                            icon: <DashboardOutlined />,
                            label: "Dashboard"
                        },
                        {
                            key: "2",
                            icon: <UserOutlined />,
                            label: "Employees"
                        }
                    ]}
                />

            </Sider>

            {/* MAIN LAYOUT */}
            <Layout>

                {/* HEADER */}
                <Header
                    style={{
                        background: "#fff",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingInline: 20
                    }}
                >

                    <Title
                        level={3}
                        style={{
                            margin: 0
                        }}
                    >
                        Employee Management System
                    </Title>

                    <Button
                        danger
                        icon={<LogoutOutlined />}
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>

                </Header>

                {/* CONTENT */}
                <Content style={{ padding: 20 }}>

                    {/* REPORT CARDS */}
                    <Row gutter={16}>

                        <Col span={8}>
                            <Card>

                                <Space direction="vertical">

                                    <TeamOutlined
                                        style={{
                                            fontSize: 30
                                        }}
                                    />

                                    <Title level={4}>
                                        Total Employees
                                    </Title>

                                    <Title level={2}>
                                        20
                                    </Title>

                                </Space>

                            </Card>
                        </Col>

                        <Col span={8}>
                            <Card>

                                <Space direction="vertical">

                                    <UserOutlined
                                        style={{
                                            fontSize: 30
                                        }}
                                    />

                                    <Title level={4}>
                                        Departments
                                    </Title>

                                    <Title level={2}>
                                        5
                                    </Title>

                                </Space>

                            </Card>
                        </Col>

                        <Col span={8}>
                            <Card>

                                <Space direction="vertical">

                                    <DollarOutlined
                                        style={{
                                            fontSize: 30
                                        }}
                                    />

                                    <Title level={4}>
                                        Monthly Salary
                                    </Title>

                                    <Title level={2}>
                                        ₱500,000
                                    </Title>

                                </Space>

                            </Card>
                        </Col>

                    </Row>

                    {/* EMPLOYEE TABLE */}
                    <Card
                        title="Employee List"
                        style={{
                            marginTop: 20
                        }}
                        extra={
                            <Button type="primary">
                                Add Employee
                            </Button>
                        }
                    >

                        <Table
                            dataSource={employees}
                            columns={columns}
                            pagination={{
                                pageSize: 5
                            }}
                        />

                    </Card>

                </Content>

            </Layout>

        </Layout>

    );

}

export default Dashboard;