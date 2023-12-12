import {
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    InputNumber,
    message,
    Row,
    Select,
    Switch,
    Typography,
    Upload
} from 'antd';
import {DownloadOutlined, MinusCircleOutlined, PlusOutlined, UploadOutlined} from '@ant-design/icons';
import {useState} from "react";
import dayjs from "dayjs";

export function InputForm() {
    const [salutation, setSalutation] = useState("")
    const [form] = Form.useForm();
    const firstName = Form.useWatch('firstname', form); //causes rerender each time firstname changes
    const lastName = Form.useWatch('lastname', form); //causes rerender each time lastname changes
    const birthdate = Form.useWatch('birthdate', form); //causes rerender each time lastname changes
    const birthdateFormatted = birthdate ? birthdate.format("YYYY-MM-DD") : undefined //remove HH:MM:SS part of the dayjs object
    const name = firstName && lastName ? `${firstName} ${lastName}` : ""
    const [developerView, setDeveloperView] = useState(true)
    const dateFormatList = ['YYYY-MM-DD', 'YYYY-MM', 'YYYY']  //this allows for datepicker UI to switch to YYYY when YYYY is entered
    const handleGenderSelect = (genderValue) => {
        console.log('gender change')
        switch (genderValue) {
            case 'male':
                setSalutation('Mr.');   //causes rerender of the whole form
                break
            case 'female':
                setSalutation("Mrs.");  //causes rerender of the whole form
                break
            default:
        }
    }
    return (
        <>
            <Form
                form={form}
                layout="vertical"
                autoComplete="off"
                // initialValues={{
                //     passengers: [
                //         {
                //             birthdate:dayjs("1999-12-26T23:00:00.000Z"),
                //             gender: "female"
                //         }
                //     ]
                // }}
                wrapperCol={{
                    span: 16, //the layout for input controls
                }}
            >
                <Form.List name={"passengers"}>
                    {(fields, {add, remove}) => (
                        <>
                            {
                                fields.map(({key, name, ...restField}) => {
                                    return <Row
                                        key={key}
                                        style={{minHeight: "70px"}}
                                    >
                                        <Col span={4} offset={1}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, "gender"]}
                                                label="Select gender"
                                            >
                                                <Select
                                                    placeholder="Select gender"
                                                    allowClear
                                                    onChange={(genderValue) => handleGenderSelect(genderValue)}
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
                                                name={[name, "lastname"]}
                                                label="Last Name"
                                                rules={[{required: true, message: "Last Name is required"}]}
                                            >
                                                <Input
                                                    placeholder="Last Name"
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={4}>
                                            <Form.Item
                                                name={[name, "birthdate"]}
                                                label="Date of Birth"
                                                rules={[{required: true, message: "Birth date is required"}]}
                                            >
                                                <DatePicker
                                                    format={dateFormatList}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                })
                            }
                            <Row>
                                <Col span={4}>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        style={{
                                            width: '60%',
                                        }}
                                        icon={<PlusOutlined/>}
                                    >
                                        Add field
                                    </Button>
                                </Col>
                            </Row>
                        </>
                    )}

                </Form.List>

                <Row style={{minHeight: "70px"}}>
                    <Col span={4}>
                        <Form.Item
                            wrapperCol={{
                                offset: 1
                            }}
                        >
                            <Button
                                type="primary"
                                htmlType="submit"
                                onClick={() => {
                                    form.submit();
                                }}
                            >
                                Preview changes
                            </Button>
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item
                            wrapperCol={{
                                offset: 1
                            }}
                        >
                            <Button
                                type="primary"
                                onClick={() => {
                                    setSalutation("")
                                    form.resetFields()
                                }}
                            >
                                Reset
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>

            </Form>

            <Row>

                <Col
                    span={4}
                    style={{color: "darkred"}}
                >
                    <div>Toggle developer view</div>
                    <Switch
                        defaultChecked
                        onChange={() => {
                            setDeveloperView(!developerView);
                        }}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={4}
                     style={{color: "darkred"}}
                >
                    {developerView &&
                        <div>
                            <pre>Hello, {`${salutation} ${name}`}</pre>
                            <pre>JSON is {JSON.stringify({
                                // ...(salutation ? {salutation} : {}), // add salutation key:value pair only if salutation is truthy, e.g. not ""
                                ...form.getFieldValue(),
                                // ...(birthdateFormatted ? {birthdate: birthdateFormatted} : {})
                            }, null, 2)}
                            </pre>
                            {console.log(JSON.stringify(form.getFieldValue(), null, 2))}
                            {/*<pre>Custom Value: {customValue}</pre>*/}
                        </div>}
                </Col>
                <Col span={4}>
                    <Upload
                        accept=".json"
                        maxCount={1} //only 1 file can be uploaded, since 1 file is enough to load passenger details
                        beforeUpload={file => {
                            const reader = new FileReader();

                            reader.onload = e => {
                                const contents = e.target.result;
                                console.log(contents);
                                // Parse JSON to object and assign to form value
                                const obj = JSON.parse(contents);
                                obj['passengers'] = obj.passengers.filter(passenger=>passenger) //filter out possible nulls
                                obj.passengers?.forEach(passenger => {
                                    if (passenger.birthdate) {
                                        passenger.birthdate = dayjs(passenger.birthdate);
                                    }
                                });
                                form.setFieldsValue(obj);
                            };

                            reader.readAsText(file);

                            // Prevent upload
                            return false;
                        }}
                    >
                        <Button>
                            <UploadOutlined /> Load saved passenger details
                        </Button>
                    </Upload>
                </Col>
                <Col span={4}>
                    <Button
                        onClick={() => {
                            const formData = form.getFieldValue();
                            const filteredPassengers = formData.passengers.filter(passenger => passenger); //prevent writing nulls,undefined to output .json
                            formData.passengers = filteredPassengers;
                            const jsonData = JSON.stringify(formData, null, 2);
                            const blob = new Blob([jsonData], { type: 'application/json' });
                            const url = URL.createObjectURL(blob);
                            const link = document.createElement('a');
                            link.href = url;
                            link.download = 'passengerDetails.json';
                            link.click();
                        }}
                    >
                       <DownloadOutlined/> Save passenger details
                    </Button>
                </Col>
            </Row>
        </>
    )
}