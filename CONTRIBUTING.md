# Contributing to DetoxIT

Thank you for your interest in contributing to the DetoxIT project! This document provides guidelines and instructions for contributing.

## Development Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [pnpm](https://pnpm.io/) as package manager

### Setting up the development environment

1. Clone the repository:
```bash
git clone <repository-url>
cd DetoxIT-
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

## Project Structure

- `/src` - Source code files
  - `/components` - React components organized by function
  - `/utils` - Utility functions and helpers
- `/public` - Static assets

## Pull Request Process

1. Create a new branch for your feature or bugfix
2. Implement your changes
3. Ensure your code follows the project's coding style
4. Write or update tests if necessary
5. Submit a pull request

## Coding Guidelines

- Follow consistent naming conventions
- Write meaningful commit messages
- Keep components modular and reusable
- Document complex logic with comments

## Testing

Run tests with:
```bash
pnpm test
```

## Reporting Issues

When reporting issues, please include:
- Description of the issue
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots if applicable
- Environment details (browser, OS, etc.)

Thank you for contributing to make DetoxIT better!
