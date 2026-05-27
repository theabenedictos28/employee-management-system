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
    Tag,
    Modal,
    Form,
    Input,
    InputNumber,
    Avatar,
    Divider
} from "antd";

import {
    UserOutlined,
    DashboardOutlined,
    LogoutOutlined,
    TeamOutlined,
    DollarOutlined,
    FileTextOutlined,
    PlusOutlined,
    EditOutlined,
    DeleteOutlined
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

function Dashboard() {

    const [employees, setEmployees] = useState([]);
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [selectedMenu, setSelectedMenu] = useState("1");
    const [collapsed, setCollapsed] = useState(false);

    const [addForm] = Form.useForm();
    const [editForm] = Form.useForm();

    const navigate = useNavigate();

    // LOGOUT
    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/");

    };

    // FETCH EMPLOYEES
    const fetchEmployees = async () => {

        try {

            const res = await api.get("/employees");

            setEmployees(res.data);

        } catch (err) {

            console.log(err);

            message.error("Failed to fetch employees");

        }

    };

    // ADD EMPLOYEE
    const handleAddEmployee = async (values) => {

        try {

            await api.post("/employees", values);

            message.success("Employee Added");

            setOpen(false);

            addForm.resetFields();

            fetchEmployees();

        } catch (err) {

            console.log(err);

            message.error("Failed to add employee");

        }

    };

    // EDIT
    const handleEdit = (record) => {

        setEditingEmployee(record);

        editForm.setFieldsValue({
            fullname: record.fullname,
            department: record.department,
            salary: record.salary
        });

        setEditOpen(true);

    };

    // UPDATE
    const handleUpdateEmployee = async (values) => {

        try {

            await api.put(
                `/employees/${editingEmployee.id}`,
                values
            );

            message.success("Employee Updated");

            setEditOpen(false);

            editForm.resetFields();

            fetchEmployees();

        } catch (err) {

            console.log(err);

            message.error("Update failed");

        }

    };

    // DELETE
    const handleDelete = async (id) => {

        try {

            await api.delete(`/employees/${id}`);

            message.success("Employee Deleted");

            fetchEmployees();

        } catch (err) {

            console.log(err);

            message.error("Delete failed");

        }

    };

    // REPORT
    const handleGenerateReport = () => {

        const report = `
EMPLOYEE MANAGEMENT REPORT

Total Employees: ${employees.length}

Total Departments: ${totalDepartments}

Total Salary: ₱${totalSalary.toLocaleString()}

EMPLOYEE LIST

${employees.map((emp) => `
ID: ${emp.id}
Name: ${emp.fullname}
Department: ${emp.department}
Salary: ₱${Number(emp.salary).toLocaleString()}
`).join("\n")}
`;

        const blob = new Blob(
            [report],
            {
                type: "text/plain"
            }
        );

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;

        link.download = "employee-report.txt";

        link.click();

        message.success("Report Generated");

    };

    useEffect(() => {

        fetchEmployees();

    }, []);

    // TOTAL SALARY
    const totalSalary = employees.reduce(
        (total, emp) => total + Number(emp.salary),
        0
    );

    // TOTAL DEPARTMENT
    const totalDepartments = [
        ...new Set(
            employees.map((emp) => emp.department)
        )
    ].length;

    // TABLE
    const columns = [
        {
            title: "Employee",
            key: "employee",
            render: (_, record) => (
                <Space size={12}>
                    <Avatar
                        size={42}
                        icon={<UserOutlined />}
                    />

                    <div>
                        <Text strong>
                            {record.fullname}
                        </Text>

                        <br />

                        <Text
                            type="secondary"
                            style={{
                                fontSize: 12
                            }}
                        >
                            ID: {record.id}
                        </Text>
                    </div>
                </Space>
            )
        },
        {
            title: "Department",
            dataIndex: "department",
            key: "department",
            align: "center",
            render: (department) => (
                <Tag
                    color="blue"
                    style={{
                        borderRadius: 20,
                        padding: "4px 14px",
                        fontSize: 13
                    }}
                >
                    {department}
                </Tag>
            )
        },
        {
            title: "Salary",
            dataIndex: "salary",
            key: "salary",
            align: "center",
            render: (salary) => (
                <Text strong>
                    ₱{Number(salary).toLocaleString()}
                </Text>
            )
        },
        {
            title: "Action",
            key: "action",
            align: "center",
            render: (_, record) => (
                <Space wrap>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                    >
                        Edit
                    </Button>

                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record.id)}
                    >
                        Delete
                    </Button>
                </Space>
            )
        }
    ];

    return (

        <Layout style={{ minHeight: "100vh" }}>

            {/* SIDEBAR */}
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                width={240}
                style={{
                    background: "#001529"
                }}
            >

                <div
                        style={{
                            height: 70,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: collapsed ? "center" : "flex-start",
                            paddingInline: collapsed ? 0 : 20,
                            gap: 12,
                            color: "#fff",
                            fontSize: 18,
                            fontWeight: "700",
                            borderBottom: "1px solid rgba(255,255,255,0.1)"
                        }}
                    >

                        <Avatar
                            size={40}
                            style={{
                                background: "#1677ff",
                                flexShrink: 0
                            }}
                            icon={<TeamOutlined />}
                        />

                        {!collapsed && (
                            <span>
                               Workbridge EMS
                            </span>
                        )}

                    </div>

                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[selectedMenu]}
                    onClick={(e) => setSelectedMenu(e.key)}
                    style={{
                        marginTop: 10,
                        borderInlineEnd: "none"
                    }}
                    items={[
                        {
                            key: "1",
                            icon: <DashboardOutlined />,
                            label: "Dashboard"
                        },
                        {
                            key: "2",
                            icon: <TeamOutlined />,
                            label: "Employees"
                        },
                        {
                            key: "3",
                            icon: <FileTextOutlined />,
                            label: "Reports"
                        }
                    ]}
                />

            </Sider>

            {/* MAIN */}
            <Layout>

{/* HEADER */}
<Header
    style={{
        background: "#ffffff",
        padding: "0 24px",
        height: 72,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #f0f0f0",
        position: "sticky",
        top: 0,
        zIndex: 1000
    }}
>

    {/* LEFT */}
    <div
        style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
        }}
    >

        <Title
            level={3}
            style={{
                margin: 0,
                fontSize: 24,
                lineHeight: 1.2
            }}
        >
            Employee Management System
        </Title>

        <Text
            type="secondary"
            style={{
                fontSize: 13
            }}
        >
            Manage employees and reports
        </Text>

    </div>

    {/* RIGHT */}
    <div
        style={{
            display: "flex",
            alignItems: "center",
            gap: 18
        }}
    >

        {/* ADMIN PROFILE */}
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "6px 14px",
                border: "1px solid #f0f0f0",
                borderRadius: 12,
                background: "#fafafa"
            }}
        >

            <Avatar
                size={42}
                icon={<UserOutlined />}
            />

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    lineHeight: 1.1
                }}
            >

                <Text
                    strong
                    style={{
                        fontSize: 14
                    }}
                >
                    Admin
                </Text>

                <Text
                    type="secondary"
                    style={{
                        fontSize: 12
                    }}
                >
                    Administrator
                </Text>

            </div>

        </div>

        {/* LOGOUT BUTTON */}
        <Button
            danger
            type="primary"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            style={{
                height: 42,
                borderRadius: 10,
                paddingInline: 18,
                fontWeight: 500
            }}
        >
            Logout
        </Button>

    </div>

</Header>

                {/* CONTENT */}
                <Content
                    style={{
                        padding: 24,
                        background: "#f5f7fb"
                    }}
                >

                    {/* DASHBOARD */}
                    {selectedMenu === "1" && (

                        <>

                            <Row gutter={[20, 20]}>

                                <Col xs={24} md={8}>

                                    <Card
                                        bordered={false}
                                        style={{
                                            borderRadius: 18,
                                            height: "100%",
                                            boxShadow: "0 2px 12px rgba(0,0,0,0.05)"
                                        }}
                                    >

                                        <Space
                                            size={18}
                                            align="center"
                                        >

                                            <Avatar
                                                size={64}
                                                icon={<TeamOutlined />}
                                            />

                                            <div>
                                                <Text type="secondary">
                                                    Total Employees
                                                </Text>

                                                <Title
                                                    level={2}
                                                    style={{
                                                        margin: 0
                                                    }}
                                                >
                                                    {employees.length}
                                                </Title>
                                            </div>

                                        </Space>

                                    </Card>

                                </Col>

                                <Col xs={24} md={8}>

                                    <Card
                                        bordered={false}
                                        style={{
                                            borderRadius: 18,
                                            height: "100%",
                                            boxShadow: "0 2px 12px rgba(0,0,0,0.05)"
                                        }}
                                    >

                                        <Space
                                            size={18}
                                            align="center"
                                        >

                                            <Avatar
                                                size={64}
                                                icon={<UserOutlined />}
                                            />

                                            <div>
                                                <Text type="secondary">
                                                    Departments
                                                </Text>

                                                <Title
                                                    level={2}
                                                    style={{
                                                        margin: 0
                                                    }}
                                                >
                                                    {totalDepartments}
                                                </Title>
                                            </div>

                                        </Space>

                                    </Card>

                                </Col>

                                <Col xs={24} md={8}>

                                    <Card
                                        bordered={false}
                                        style={{
                                            borderRadius: 18,
                                            height: "100%",
                                            boxShadow: "0 2px 12px rgba(0,0,0,0.05)"
                                        }}
                                    >

                                        <Space
                                            size={18}
                                            align="center"
                                        >

                                            <Avatar
                                                size={64}
                                                icon={<DollarOutlined />}
                                            />

                                            <div>
                                                <Text type="secondary">
                                                    Total Salary
                                                </Text>

                                                <Title
                                                    level={2}
                                                    style={{
                                                        margin: 0
                                                    }}
                                                >
                                                    ₱{totalSalary.toLocaleString()}
                                                </Title>
                                            </div>

                                        </Space>

                                    </Card>

                                </Col>

                            </Row>

                            {/* RECENT EMPLOYEES */}
                            <Card
                                bordered={false}
                                title="Recent Employees"
                                style={{
                                    marginTop: 24,
                                    borderRadius: 18,
                                    boxShadow: "0 2px 12px rgba(0,0,0,0.05)"
                                }}
                            >

                                <Table
                                    rowKey="id"
                                    dataSource={[...employees]
                                        .sort((a, b) => b.id - a.id)
                                        .slice(0, 5)}
                                    pagination={false}
                                    columns={[
                                        {
                                            title: "Employee",
                                            key: "employee",
                                            render: (_, record) => (
                                                <Space size={12}>
                                                    <Avatar
                                                        icon={<UserOutlined />}
                                                    />

                                                    <div>
                                                        <Text strong>
                                                            {record.fullname}
                                                        </Text>

                                                        <br />

                                                        <Text
                                                            type="secondary"
                                                            style={{
                                                                fontSize: 12
                                                            }}
                                                        >
                                                            ID: {record.id}
                                                        </Text>
                                                    </div>
                                                </Space>
                                            )
                                        },
                                        {
                                            title: "Department",
                                            dataIndex: "department",
                                            align: "center",
                                            render: (department) => (
                                                <Tag
                                                    color="blue"
                                                    style={{
                                                        borderRadius: 20,
                                                        padding: "4px 14px"
                                                    }}
                                                >
                                                    {department}
                                                </Tag>
                                            )
                                        },
                                        {
                                            title: "Salary",
                                            dataIndex: "salary",
                                            align: "center",
                                            render: (salary) => (
                                                <Text strong>
                                                    ₱{Number(salary).toLocaleString()}
                                                </Text>
                                            )
                                        }
                                    ]}
                                />

                            </Card>

                        </>

                    )}

                    {/* EMPLOYEES */}
                    {selectedMenu === "2" && (

                        <Card
                            bordered={false}
                            style={{
                                borderRadius: 18,
                                boxShadow: "0 2px 12px rgba(0,0,0,0.05)"
                            }}
                            title="Employee List"
                            extra={
                                <Button
                                    type="primary"
                                    icon={<PlusOutlined />}
                                    onClick={() => setOpen(true)}
                                >
                                    Add Employee
                                </Button>
                            }
                        >

                            <Table
                                rowKey="id"
                                dataSource={employees}
                                columns={columns}
                                pagination={{
                                    pageSize: 5
                                }}
                            />

                        </Card>

                    )}

                    {/* REPORTS */}
                    {selectedMenu === "3" && (

                        <Card
                            bordered={false}
                            style={{
                                borderRadius: 18,
                                boxShadow: "0 2px 12px rgba(0,0,0,0.05)"
                            }}
                            title="Employee Report"
                            extra={
                                <Button
                                    type="primary"
                                    icon={<FileTextOutlined />}
                                    onClick={handleGenerateReport}
                                >
                                    Generate Report
                                </Button>
                            }
                        >

                            <Row gutter={[20, 20]}>

                                <Col xs={24} md={8}>

                                    <Card
                                        bordered={false}
                                        style={{
                                            textAlign: "center",
                                            borderRadius: 16,
                                            background: "#fafafa"
                                        }}
                                    >

                                        <Title level={5}>
                                            Employees
                                        </Title>

                                        <Divider />

                                        <Title level={2}>
                                            {employees.length}
                                        </Title>

                                    </Card>

                                </Col>

                                <Col xs={24} md={8}>

                                    <Card
                                        bordered={false}
                                        style={{
                                            textAlign: "center",
                                            borderRadius: 16,
                                            background: "#fafafa"
                                        }}
                                    >

                                        <Title level={5}>
                                            Departments
                                        </Title>

                                        <Divider />

                                        <Title level={2}>
                                            {totalDepartments}
                                        </Title>

                                    </Card>

                                </Col>

                                <Col xs={24} md={8}>

                                    <Card
                                        bordered={false}
                                        style={{
                                            textAlign: "center",
                                            borderRadius: 16,
                                            background: "#fafafa"
                                        }}
                                    >

                                        <Title level={5}>
                                            Salary
                                        </Title>

                                        <Divider />

                                        <Title level={2}>
                                            ₱{totalSalary.toLocaleString()}
                                        </Title>

                                    </Card>

                                </Col>

                            </Row>

                        </Card>

                    )}

                    {/* ADD MODAL */}
                    <Modal
                        title="Add Employee"
                        open={open}
                        footer={null}
                        centered
                        onCancel={() => {

                            setOpen(false);

                            addForm.resetFields();

                        }}
                    >

                        <Form
                            layout="vertical"
                            form={addForm}
                            onFinish={handleAddEmployee}
                        >

                            <Form.Item
                                label="Full Name"
                                name="fullname"
                                rules={[
                                    {
                                        required: true,
                                        message: "Enter fullname"
                                    }
                                ]}
                            >
                                <Input size="large" />
                            </Form.Item>

                            <Form.Item
                                label="Department"
                                name="department"
                                rules={[
                                    {
                                        required: true,
                                        message: "Enter department"
                                    }
                                ]}
                            >
                                <Input size="large" />
                            </Form.Item>

                            <Form.Item
                                label="Salary"
                                name="salary"
                                rules={[
                                    {
                                        required: true,
                                        message: "Enter salary"
                                    }
                                ]}
                            >
                                <InputNumber
                                    size="large"
                                    style={{
                                        width: "100%"
                                    }}
                                />
                            </Form.Item>

                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                                block
                            >
                                Save Employee
                            </Button>

                        </Form>

                    </Modal>

                    {/* EDIT MODAL */}
                    <Modal
                        title="Edit Employee"
                        open={editOpen}
                        footer={null}
                        centered
                        onCancel={() => {

                            setEditOpen(false);

                            editForm.resetFields();

                        }}
                    >

                        <Form
                            layout="vertical"
                            form={editForm}
                            onFinish={handleUpdateEmployee}
                        >

                            <Form.Item
                                label="Full Name"
                                name="fullname"
                                rules={[
                                    {
                                        required: true,
                                        message: "Enter fullname"
                                    }
                                ]}
                            >
                                <Input size="large" />
                            </Form.Item>

                            <Form.Item
                                label="Department"
                                name="department"
                                rules={[
                                    {
                                        required: true,
                                        message: "Enter department"
                                    }
                                ]}
                            >
                                <Input size="large" />
                            </Form.Item>

                            <Form.Item
                                label="Salary"
                                name="salary"
                                rules={[
                                    {
                                        required: true,
                                        message: "Enter salary"
                                    }
                                ]}
                            >
                                <InputNumber
                                    size="large"
                                    style={{
                                        width: "100%"
                                    }}
                                />
                            </Form.Item>

                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                                block
                            >
                                Update Employee
                            </Button>

                        </Form>

                    </Modal>

                </Content>

            </Layout>

        </Layout>

    );

}

export default Dashboard;