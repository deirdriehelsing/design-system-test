import { render, screen } from '@testing-library/react';
import Avatar from '.';
import React from 'react';

jest.mock('./index.css', () => ({
  avatar: {
    small: 'avatar-small',
    large: 'avatar-large',
  },
  avatarBackground: {
    royalBlue: 'avatarBackground-royalBlue',
    coral: 'avatarBackground-coral',
    seafoam: 'avatarBackground-seafoam',
    goldenrod: 'avatarBackground-goldenrod',
  },
  avatarBorder: {
    gold: 'avatarBorder-gold',
    green: 'avatarBorder-green',
    brick: 'avatarBorder-brick',
    amethyst: 'avatarBorder-amethyst',
  },
}));

describe('<Avatar />', () => {
  describe('text avatars', () => {
    it('renders children', () => {
      render(<Avatar>JD</Avatar>);
      const avatar = screen.getByText('JD');
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveClass('avatar-small');
    });

    it('renders abbreviated user name', () => {
      render(<Avatar userName={['John', 'Doe']} />);
      const avatar = screen.getByText('JD');
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveClass('avatar-small');
    });

    it('renders with outlined variant', () => {
      render(<Avatar backgroundVariant="outlined">JD</Avatar>);
      const avatar = screen.getByText('JD');
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveClass('avatarBorder-gold');
    });
  });

  describe('image avatars', () => {
    it('renders with image', () => {
      render(<Avatar size="large" src="blueshift.jpg" userName={['John', 'Doe']} />);
      const image = screen.getByRole('img');
      const avatar = screen.getByRole('figure').firstChild;

      expect(image).toHaveAttribute('src', 'blueshift.jpg');
      expect(avatar).toHaveClass('avatar-large');
    });
  });

  describe('title and subtitle', () => {
    it('renders title and subtitle', () => {
      render(<Avatar subtitle="Software Engineer" title="John Doe" />);
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('(Software Engineer)')).toBeInTheDocument();
    });
  });
});
