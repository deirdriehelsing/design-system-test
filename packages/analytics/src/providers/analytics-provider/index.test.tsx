import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import {
  useAnalyticsInitialization,
  useGuidesAndSurveysInitialization,
  useSessionReplayInitialization,
  useSpaUrlStorage,
} from './hooks';
import AnalyticsProvider from '.';
import React from 'react';

// Mock the hooks
jest.mock('./hooks', () => ({
  useAnalyticsInitialization: jest.fn(),
  useGuidesAndSurveysInitialization: jest.fn(),
  useSessionReplayInitialization: jest.fn(),
  useSpaUrlStorage: jest.fn(),
}));

describe('<AnalyticsProvider />', () => {
  const mockUseAnalyticsInitialization = jest.mocked(useAnalyticsInitialization);
  const mockUseGuidesAndSurveysInitialization = jest.mocked(useGuidesAndSurveysInitialization);
  const mockUseSessionReplayInitialization = jest.mocked(useSessionReplayInitialization);
  const mockUseSpaUrlStorage = jest.mocked(useSpaUrlStorage);

  it('renders correctly', () => {
    render(
      <AnalyticsProvider writeKey="test-write-key">
        <div>Test Child</div>
      </AnalyticsProvider>
    );

    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('initializes analytics with the provided write key', () => {
    render(
      <AnalyticsProvider writeKey="test-write-key">
        <div>Test Child</div>
      </AnalyticsProvider>
    );

    expect(mockUseAnalyticsInitialization).toHaveBeenCalledTimes(1);
    expect(mockUseAnalyticsInitialization).toHaveBeenCalledWith('test-write-key', {});
  });

  it('initializes guides and surveys when guides and surveys key is provided', () => {
    render(
      <AnalyticsProvider guidesAndSurveysKey="test-api-key" writeKey="test-write-key">
        <div>Test Child</div>
      </AnalyticsProvider>
    );

    expect(mockUseGuidesAndSurveysInitialization).toHaveBeenCalledTimes(1);
    expect(mockUseGuidesAndSurveysInitialization).toHaveBeenCalledWith('test-api-key');
  });

  it('initializes session replay when session replay key is provided', () => {
    render(
      <AnalyticsProvider sessionReplayKey="test-api-key" writeKey="test-write-key">
        <div>Test Child</div>
      </AnalyticsProvider>
    );

    expect(mockUseSessionReplayInitialization).toHaveBeenCalledTimes(1);
    expect(mockUseSessionReplayInitialization).toHaveBeenCalledWith('test-api-key', undefined);
  });

  it('passes session replay options when provided', () => {
    const sessionReplayOptions = { sampleRate: 50 };
    render(
      <AnalyticsProvider
        sessionReplayKey="test-api-key"
        sessionReplayOptions={sessionReplayOptions}
        writeKey="test-write-key"
      >
        <div>Test Child</div>
      </AnalyticsProvider>
    );

    expect(mockUseSessionReplayInitialization).toHaveBeenCalledWith(
      'test-api-key',
      sessionReplayOptions
    );
  });

  it('passes custom analytics options', () => {
    const customOptions = {
      initialPageview: false,
      timeout: 1000,
    };

    render(
      <AnalyticsProvider options={customOptions} writeKey="test-write-key">
        <div>Test Child</div>
      </AnalyticsProvider>
    );

    expect(mockUseAnalyticsInitialization).toHaveBeenCalledWith('test-write-key', customOptions);
  });

  it('enables SPA URL storage when isSpa prop is true', () => {
    render(
      <AnalyticsProvider isSpa={true} writeKey="test-write-key">
        <div>Test Child</div>
      </AnalyticsProvider>
    );

    expect(mockUseSpaUrlStorage).toHaveBeenCalledWith({ enabled: true });
  });

  it('enables SPA URL storage with deprecated isSpa option', () => {
    render(
      <AnalyticsProvider isSpa={true} writeKey="test-write-key">
        <div>Test Child</div>
      </AnalyticsProvider>
    );

    expect(mockUseSpaUrlStorage).toHaveBeenCalledWith({ enabled: true });
  });
});
