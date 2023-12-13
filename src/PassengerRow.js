import {Button, Col, DatePicker, Form, Input, Row, Select} from "antd";
import {DeleteOutlined} from "@ant-design/icons";

function PassengerRow({name, remove, passengerName}) {
    const dateFormatList = ['YYYY-MM-DD', 'YYYY-MM', 'YYYY']  //this allows for datepicker UI to switch to YYYY when YYYY is entered

    return (
        <Row
            style={{
                justifyContent: 'center' //makes columns evenly spaced
            }}

        >
            <Col span={3}
                 style={{
                     display: "flex",      //to align the content
                     alignItems: "end", //to align the content
                 }}
            >
                <Form.Item
                    wrapperCol={{span: 24}}
                    name={[name, "title"]}
                    label="Select title"
                >
                    <Select
                        placeholder="Select title"
                        allowClear
                        options={[
                            {
                                label: "Mr.",
                                value: "Mr."
                            },
                            {
                                label: "Mrs.",
                                value: "Mrs."
                            }
                        ]}
                    />
                </Form.Item>
            </Col>
            <Col span={4}>
                <Form.Item
                    wrapperCol={{span: 20}}
                    name={[name, "gender"]}
                    rules={[{required: true, message: "Gender is required"}]}
                    label="Select gender"
                >
                    <Select
                        placeholder="Select gender"
                        allowClear
                        options={[
                            {
                                label: "Female",
                                value: "female"
                            },
                            {
                                label: "Male",
                                value: "male"
                            }
                        ]}
                    />
                </Form.Item>
            </Col>
            <Col span={4}>
                <Form.Item
                    wrapperCol={{span: 20}}
                    name={[name, "firstname"]}
                    label="First Name"
                    rules={[{required: true, message: "First Name is required"}]}
                >
                    <Input
                        placeholder="First Name"
                    />
                </Form.Item>
            </Col>
            <Col span={4}>
                <Form.Item
                    wrapperCol={{span: 20}}
                    name={[name, "lastname"]}
                    label="Last Name"
                    rules={[{required: true, message: "Last Name is required"}]}
                >
                    <Input
                        placeholder="Last Name"
                    />
                </Form.Item>
            </Col>
            <Col span={3}
                 style={{
                     display: "flex",      //to align the content
                     alignItems: "center", //to align the content
                 }}
            >
                <Form.Item
                    wrapperCol={{span: 24}}
                    name={[name, "birthdate"]}
                    label="Date of Birth"
                    rules={[{required: true, message: "Birth date is required"}]}
                >
                    <DatePicker
                        format={dateFormatList}
                    />
                </Form.Item>
            </Col>
            <Col span={3}
                 style={{
                     display: "flex",
                     alignItems: "center",
                 }}
            >
                <Button
                    type='text'
                    onClick={() => {
                        remove(passengerName)  //actually an index 0,1,2 ..
                    }}>
                    <DeleteOutlined style={{color: '#9a1010'}}/>
                </Button>
            </Col>
        </Row>
    )
}

export default PassengerRow;