import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import Webcam from "../components/Webcam";
import { TEST_IDS } from "../constants";

describe('Webcam modal', () => {
    it('should have only capture button initially', async () => {
        const useMockFn = jest.fn();
        const closeMockFn = jest.fn();
        render(<Webcam open={true} onUsingScreenshot={useMockFn} closeModal={closeMockFn} />);
        expect(screen.getAllByRole('button').length).toEqual(1);
        expect(screen.getByTestId(TEST_IDS.webcamCaptureButton)).toBeInTheDocument();
        expect(screen.getByTestId(TEST_IDS.webcamVideo)).toBeInTheDocument();
        fireEvent.click(screen.getByTestId(TEST_IDS.webcamCaptureButton));
    });
});