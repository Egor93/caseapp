import {render, screen} from '@testing-library/react';
import './matchMediaMock'
import PreviewModal from "./PreviewModal";
import dayjs from "dayjs";

test('renders title text', () => {
    const mocks = {
        passengers: [], //empty since we are checking the title
        isModalOpen: true,
        handleOk: jest.fn(),
        handleCancel: jest.fn()
    }
    render(<PreviewModal
        passengers={mocks.passengers}
        isModalOpen={mocks.isModalOpen}
        handleOk={mocks.handleOk}
        handleCancel={mocks.handleCancel}
    />);
    const headerText = screen.getByText(/Confirm passengers details/i);
    expect(headerText).toBeInTheDocument();
});

test('check full name concatenation', () => {
    const mocks = {
        passengers: [{
            "title":"Mr.",
            "gender": "male",
            "firstname": "Jonny",
            "lastname": "Depp",
        }],
        isModalOpen: true,
        handleOk: jest.fn(),
        handleCancel: jest.fn()
    }
    render(<PreviewModal
        passengers={mocks.passengers}
        isModalOpen={mocks.isModalOpen}
        handleOk={mocks.handleOk}
        handleCancel={mocks.handleCancel}
    />);
    const fullname = "Mr. Jonny Depp"
    expect(screen
        .getByText(fullname)
    ).toBeInTheDocument();
});

test('check date parsing', () => {
    const mocks = {
        passengers: [{
            "title":"Mr.",
            "gender": "male",
            "firstname": "Jonny",
            "lastname": "Depp",
            "birthdate":dayjs("1969-07-11T17:03:02.673Z"),
        }],
        isModalOpen: true,
        handleOk: jest.fn(),
        handleCancel: jest.fn()
    }
    render(<PreviewModal
        passengers={mocks.passengers}
        isModalOpen={mocks.isModalOpen}
        handleOk={mocks.handleOk}
        handleCancel={mocks.handleCancel}
    />);
    const birthdate = "1969-07-11" //expected result of parsing with dayjs .format(YYYY-MM-DD)
    expect(screen
        .getByText(birthdate)
    ).toBeInTheDocument();
});
