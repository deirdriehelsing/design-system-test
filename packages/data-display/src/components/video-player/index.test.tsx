import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import VideoPlayer from './index';

const mockOnEnded = jest.fn();
const mockOnPause = jest.fn();
const mockOnPlay = jest.fn();
const mockOnStop = jest.fn();

const stubProps = {
  'data-testid': 'react-player',
  onEnded: mockOnEnded,
  onPause: mockOnPause,
  onPlay: mockOnPlay,
  onStop: mockOnStop,
  url: 'http://media.example.com/test.mp4',
};

describe('VideoPlayer', () => {
  it('renders correctly', () => {
    render(<VideoPlayer {...stubProps} />);
  });

  describe('callbacks', () => {
    it('calls onPlay', () => {
      render(<VideoPlayer {...stubProps} />);

      const videoElement = screen.getByTestId('react-player').firstChild as HTMLVideoElement;

      fireEvent.play(videoElement);

      expect(mockOnPlay).toHaveBeenCalledTimes(1);
    });

    it('calls onPause', () => {
      render(<VideoPlayer {...stubProps} />);

      const videoElement = screen.getByTestId('react-player').firstChild as HTMLVideoElement;

      fireEvent.play(videoElement);

      fireEvent.pause(videoElement);

      expect(mockOnPause).toHaveBeenCalledTimes(1);
    });

    it('calls onEnded', () => {
      render(<VideoPlayer {...stubProps} />);

      const videoElement = screen.getByTestId('react-player').firstChild as HTMLVideoElement;

      fireEvent.play(videoElement);

      fireEvent.ended(videoElement);

      expect(mockOnEnded).toHaveBeenCalledTimes(1);
    });

    it('calls onStop if player unmounts midway through a complete reproduction', () => {
      const { unmount } = render(<VideoPlayer {...stubProps} />);

      const videoElement = screen.getByTestId('react-player').firstChild as HTMLVideoElement;

      fireEvent.play(videoElement);

      unmount();

      expect(mockOnStop).toHaveBeenCalledTimes(1);
    });

    it('does not call onStop if player unmounts before reproduction starts', () => {
      const { unmount } = render(<VideoPlayer {...stubProps} />);

      unmount();

      expect(mockOnStop).not.toHaveBeenCalled();
    });

    it('does not call onStop if player unmounts after reproduction has ended', () => {
      const { unmount } = render(<VideoPlayer {...stubProps} />);

      const videoElement = screen.getByTestId('react-player').firstChild as HTMLVideoElement;

      fireEvent.play(videoElement);

      fireEvent.ended(videoElement);

      unmount();

      expect(mockOnStop).not.toHaveBeenCalled();
    });

    it('renders skeleton when loading and player when not loading', () => {
      const { rerender } = render(<VideoPlayer {...stubProps} loading={true} />);

      expect(screen.getByTestId('skeleton')).toBeInTheDocument();
      expect(screen.queryByTestId('react-player')).not.toBeInTheDocument();

      rerender(<VideoPlayer {...stubProps} loading={false} />);

      expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument();
      expect(screen.getByTestId('react-player')).toBeInTheDocument();
    });

    it('sets player poster when available', () => {
      render(
        <VideoPlayer
          {...stubProps}
          poster="https://image.mux.com/zOUx8nlOzSWZmePj6XJyq2NCdvGUEwnl/thumbnail.png"
        />
      );

      const videoElement = screen.getByTestId('react-player').firstChild as HTMLVideoElement;

      expect(videoElement.poster).toBe(
        'https://image.mux.com/zOUx8nlOzSWZmePj6XJyq2NCdvGUEwnl/thumbnail.png'
      );
    });
  });
});
