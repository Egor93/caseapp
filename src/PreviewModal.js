import {Card, Col, Modal, Row} from "antd";
import {cardHeadStyle, cardStyle} from "./CardsStyles";

function PreviewModal({isModalOpen, handleOk, handleCancel, passengers}) {

    return (
        <>
            <Modal
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Card title="Confirm passengers details"
                      style={{
                          ...cardStyle,
                          borderWidth: '0px',
                          backgroundColor: '#fff'
                      }}
                      headStyle={{
                          ...cardHeadStyle,
                          backgroundColor: '#fff'
                      }}
                >
                    <div>
                        {passengers &&  //in case passengers is undefined
                            passengers
                                .filter(passenger => passenger) //filter out undefined or null
                                .map((passenger, index) => {
                                    const title = passenger['title'] || "";  //when title is not provided, the rest are required(validated)!
                                    const fullname = [title, passenger['firstname'], passenger['lastname']].filter(Boolean).join(" ");
                                    let birthdateProcessed = "";
                                    if (passenger['birthdate']){
                                        try {
                                            birthdateProcessed = passenger['birthdate'].format("YYYY-MM-DD")
                                        } catch (error) {
                                            console.log("Invalid date/date format", error)
                                        }
                                    }

                                    return (
                                        <Card key={index}
                                              title={`Passenger ${index + 1}`}
                                              style={{
                                                  ...cardStyle,
                                                  borderWidth: "1px",
                                                  margin: -1 //avoid double border width on cards intersection
                                              }}
                                              bodyStyle={{
                                                  backgroundColor: '#fff'
                                              }}
                                              headStyle={cardHeadStyle}
                                        >
                                            <Row>
                                                <Col span={8}>
                                                    Full name:
                                                </Col>
                                                <Col span={16}>
                                                    {fullname}
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span={8}>
                                                    Gender:
                                                </Col>
                                                <Col span={8}>
                                                    {passenger?.gender}
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span={8}>
                                                    Date of birth:
                                                </Col>
                                                <Col span={8}>
                                                    {birthdateProcessed}
                                                </Col>
                                            </Row>
                                        </Card>
                                    )
                                })
                        }
                    </div>
                </Card>
            </Modal>
        </>
    )
}

export default PreviewModal;