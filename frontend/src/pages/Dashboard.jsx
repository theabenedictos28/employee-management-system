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
    InputNumber
} from "antd";

import {
    UserOutlined,
    DashboardOutlined,
    LogoutOutlined,
    TeamOutlined,
    DollarOutlined,
    FileTextOutlined
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

function Dashboard() {

    const [employees, setEmployees] = useState([]);

    const [open, setOpen] = useState(false);

    const [editOpen, setEditOpen] = useState(false);

    const [editingEmployee, setEditingEmployee] = useState(null);

    const [selectedMenu, setSelectedMenu] = useState("1");

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

            await api.post(
                "/employees",
                values
            );

            message.success("Employee Added");

            setOpen(false);

            addForm.resetFields();

            fetchEmployees();

        } catch (err) {

            console.log(err);

            message.error("Failed to add employee");

        }

    };

    // OPEN EDIT MODAL
    const handleEdit = (record) => {

        setEditingEmployee(record);

        editForm.setFieldsValue({
            fullname: record.fullname,
            department: record.department,
            salary: record.salary
        });

        setEditOpen(true);

    };

    // UPDATE EMPLOYEE
    const handleUpdateEmployee = async (values) => {

        try {

            await api.put(
                `/employees/${editingEmployee.id}`,
                values
            );

            message.success("Employee Updated");

            setEditOpen(false);

            setEditingEmployee(null);

            editForm.resetFields();

            fetchEmployees();

        } catch (err) {

            console.log(err);

            message.error("Update failed");

        }

    };

    // DELETE EMPLOYEE
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

    // GENERATE REPORT
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

    // UNIQUE DEPARTMENTS
    const totalDepartments = [
        ...new Set(
            employees.map((emp) => emp.department)
        )
    ].length;

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
            render: (salary) =>
                `₱${Number(salary).toLocaleString()}`
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space>

                    <Button
                        type="primary"
                        onClick={() => handleEdit(record)}
                    >
                        Edit
                    </Button>

                    <Button
                        danger
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
                    selectedKeys={[selectedMenu]}
                    onClick={(e) => setSelectedMenu(e.key)}
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
                        },
                        {
                            key: "3",
                            icon: <FileTextOutlined />,
                            label: "Generate Report"
                        }
                    ]}
                />

            </Sider>

            {/* MAIN */}
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

                    {/* DASHBOARD */}
                    {selectedMenu === "1" && (

                        <>

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
                                                {employees.length}
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
                                                {totalDepartments}
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
                                                ₱{totalSalary.toLocaleString()}
                                            </Title>

                                        </Space>

                                    </Card>
                                </Col>

                            </Row>

                            {/* RECENT EMPLOYEES */}
                            <Card
                                title="Recent Employees"
                                style={{
                                    marginTop: 20
                                }}
                            >

                                <Table
                                    rowKey="id"
                                    dataSource={[...employees]
                                        .sort((a, b) => b.id - a.id)
                                        .slice(0, 5)}
                                    columns={[
                                        {
                                            title: "ID",
                                            dataIndex: "id"
                                        },
                                        {
                                            title: "Full Name",
                                            dataIndex: "fullname"
                                        },
                                        {
                                            title: "Department",
                                            dataIndex: "department",
                                            render: (department) => (
                                                <Tag color="blue">
                                                    {department}
                                                </Tag>
                                            )
                                        },
                                        {
                                            title: "Salary",
                                            dataIndex: "salary",
                                            render: (salary) =>
                                                `₱${Number(salary).toLocaleString()}`
                                        }
                                    ]}
                                    pagination={false}
                                />

                            </Card>

                        </>

                    )}

                    {/* EMPLOYEE SECTION */}
                    {selectedMenu === "2" && (

                        <Card
                            title="Employee List"
                            extra={
                                <Button
                                    type="primary"
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

                    {/* REPORT SECTION */}
                    {selectedMenu === "3" && (

                        <Card
                            title="Employee Report"
                            extra={
                                <Button
                                    type="primary"
                                    onClick={handleGenerateReport}
                                >
                                    Generate Report
                                </Button>
                            }
                        >

                            <Space
                                direction="vertical"
                                size="large"
                            >

                                <Title level={4}>
                                    Report Summary
                                </Title>

                                <p>
                                    Total Employees:
                                    {" "}
                                    {employees.length}
                                </p>

                                <p>
                                    Total Departments:
                                    {" "}
                                    {totalDepartments}
                                </p>

                                <p>
                                    Total Salary:
                                    {" "}
                                    ₱{totalSalary.toLocaleString()}
                                </p>

                            </Space>

                        </Card>

                    )}

                    {/* ADD EMPLOYEE MODAL */}
                    <Modal
                        title="Add Employee"
                        open={open}
                        onCancel={() => {

                            setOpen(false);

                            addForm.resetFields();

                        }}
                        footer={null}
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
                                <Input />
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
                                <Input />
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
                                    style={{ width: "100%" }}
                                />
                            </Form.Item>

                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                            >
                                Save Employee
                            </Button>

                        </Form>

                    </Modal>

                    {/* EDIT EMPLOYEE MODAL */}
                    <Modal
                        title="Edit Employee"
                        open={editOpen}
                        onCancel={() => {

                            setEditOpen(false);

                            editForm.resetFields();

                        }}
                        footer={null}
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
                                <Input />
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
                                <Input />
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
                                    style={{ width: "100%" }}
                                />
                            </Form.Item>

                            <Button
                                type="primary"
                                htmlType="submit"
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