// // components/__tests__/PortableText.test.tsx
// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import PortableText from '../PortableText';
// import { PortableTextBlock } from '@portabletext/types';

// const mockContent: PortableTextBlock[] = [
//   {
//     _type: 'block',
//     _key: 'uniqueKey1',
//     style: 'h1',
//     children: [
//       {
//         _type: 'span',
//         _key: 'spanKey1',
//         text: 'Test Heading',
//         marks: [],
//       },
//     ],
//   },
//   {
//     _type: 'block',
//     _key: 'uniqueKey2',
//     style: 'normal',
//     children: [
//       {
//         _type: 'span',
//         _key: 'spanKey2',
//         text: 'Test paragraph.',
//         marks: [],
//       },
//     ],
//   },
// ];

// describe('PortableText Component', () => {
//   it('renders headings and paragraphs correctly', () => {
//     render(<PortableText content={mockContent} />);

//     const heading = screen.getByText('Test Heading');
//     const paragraph = screen.getByText('Test paragraph.');

//     expect(heading).toBeInTheDocument();
//     expect(paragraph).toBeInTheDocument();
//   });

//   it('renders fallback message when content is empty', () => {
//     render(<PortableText content={[]} />);

//     const fallbackMessage = screen.getByText('No content available.');
//     expect(fallbackMessage).toBeInTheDocument();
//   });
// });
