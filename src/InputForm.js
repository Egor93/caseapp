import {
    Button, Card,
    Col,
    DatePicker,
    Form,
    Input,
    InputNumber,
    message, Modal,
    Row,
    Select,
    Switch,
    Typography,
    Upload
} from 'antd';
import {DownloadOutlined, MinusCircleOutlined, PlusOutlined, UndoOutlined, UploadOutlined} from '@ant-design/icons';
import {useEffect, useState} from "react";
import dayjs from "dayjs";

function PreviewModal({isModalOpen, handleOk, handleCancel, passengers}) {
    return (
        <>
            <Modal
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>Passenger Name:{JSON.stringify(passengers, null, 2)}</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </>
    )
}

function PassengerDetails({form, handleSalutationChange, resetSalutation, setSaveable, passengers}) {
    const dateFormatList = ['YYYY-MM-DD', 'YYYY-MM', 'YYYY']  //this allows for datepicker UI to switch to YYYY when YYYY is entered
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return <Form
        form={form}
        layout="vertical"
        autoComplete="off"
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
                                <Col span={3}
                                     style={{
                                         display: "flex",      //to align the content
                                         alignItems: "center", //to align the content
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
                                            onChange={(genderValue) => handleSalutationChange(genderValue)}
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
                                            onChange={(genderValue) => handleSalutationChange(genderValue)}
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
                            </Row>
                        })
                    }
                    <Row style={{minHeight: "70px"}}>
                        <Col span={4}>
                            <Button
                                type="dashed"
                                onClick={() => {
                                    add()
                                    setSaveable(true)
                                }
                                }
                                style={{
                                    backgroundColor: '#bedaf8'
                                }}
                                icon={<PlusOutlined/>}
                            >
                                Add passenger
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
                            showModal();
                            //form.submit();
                        }}
                    >
                        Preview changes
                    </Button>
                </Form.Item>
                <PreviewModal
                    passengers={passengers}
                    isModalOpen={isModalOpen}
                    handleOk={handleOk}
                    handleCancel={handleCancel}
                />
            </Col>
            <Col span={4}>
                <Form.Item
                    wrapperCol={{
                        offset: 1
                    }}
                >
                    <Button
                        type="primary"
                        style={{
                            backgroundColor: '#8d55a9'
                        }}
                        onClick={() => {
                            resetSalutation();
                            setSaveable(false);
                            form.resetFields();
                        }}
                    >
                        <UndoOutlined/> Reset
                    </Button>
                </Form.Item>
            </Col>
        </Row>
    </Form>
}

function SaveDetails({form, saveable}) {
    return (
        <Row>
            <Col span={12}>
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
                            obj['passengers'] = obj.passengers.filter(passenger => passenger) //filter out possible nulls
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
                        <UploadOutlined/> Load saved passenger details
                    </Button>
                </Upload>
            </Col>
            <Col span={12}>
                <Button
                    // disabled={!form.getFieldValue()}
                    // disabled={Object.keys(form.getFieldValue().length)===0}
                    disabled={!saveable}
                    onClick={() => {
                        const formData = form.getFieldValue();
                        const filteredPassengers = formData.passengers.filter(passenger => passenger); //prevent writing nulls,undefined to output .json
                        formData.passengers = filteredPassengers;
                        const jsonData = JSON.stringify(formData, null, 2);
                        const blob = new Blob([jsonData], {type: 'application/json'});
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
    )
}


export function InputForm() {
    const [form] = Form.useForm();
    const [salutation, setSalutation] = useState("")
    const passengers = Form.useWatch('passengers', form)
    // const name = firstName && lastName ? `${firstName} ${lastName}` : ""
    const [developerView, setDeveloperView] = useState(true)
    const [saveable, setSaveable] = useState(false)

    const resetSalutation = () => {
        setSalutation("")
    }
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
    const cardStyle = {
        width: "90%",
        borderStyle: 'solid',
        borderWidth: "2px",
        borderColor: '#375180',
    }
    const cardHeadStyle = {
        backgroundColor: '#ebeff5',
        color: "#4e5096"
    }
    return (
        <>
            <Card title='Passenger details'
                  headStyle={cardHeadStyle}
                  style={{
                      ...cardStyle,
                      borderBottomWidth: "2px"
                  }}>
                <PassengerDetails
                    passengers={passengers}
                    form={form}
                    handleSalutationChange={handleGenderSelect}
                    resetSalutation={resetSalutation}
                    setSaveable={setSaveable}   //workaround to toggle on/off save button TODO:use touched property!
                />
                <Card title='Save details'
                      headStyle={cardHeadStyle}
                      style={{
                          ...cardStyle,
                          borderWidth: "1px"
                      }}
                      bordered={false}>
                    <SaveDetails
                        form={form}
                        saveable={saveable}
                    />
                </Card>
            </Card>
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
                <Col span={4}
                     style={{color: "darkred"}}
                >
                    {developerView &&
                        <div>
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
            </Row>
        </>
    )
}