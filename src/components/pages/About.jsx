// src/components/pages/About.jsx
import React from 'react';
import Button from '../common/Button';
import { Link } from 'react-router-dom';
import Card from '../common/Card';

const About = () => {  const teamMembers = [
    {
      name: 'Nashaad Mohamed',
      role: 'Product Manager',
      secondaryRole: 'Data Analyst',
      bio: 'Leads product development with expertise in data analysis to drive strategic decision-making.',
      image: 'https://ui-avatars.com/api/?name=Nashaad+Mohamed&background=0D8ABC&color=fff&size=256',
    },
    {
      name: 'Ibrahim Aidaruz',
      role: 'Designer',
      secondaryRole: 'Data Analyst',
      bio: 'Creates intuitive user experiences while providing data insights to inform design decisions.',
      image: 'https://ui-avatars.com/api/?name=Ibrahim+Aidaruz&background=27AE60&color=fff&size=256',
    },
    {
      name: 'Oumaima Lakbiri',
      role: 'Data Analyst',
      bio: 'Transforms complex data into actionable insights to optimize our e-waste reduction initiatives.',
      image: 'https://ui-avatars.com/api/?name=Oumaima+Lakbiri&background=9B59B6&color=fff&size=256',
    },
    {
      name: 'Diana Namukuve',
      role: 'Researcher',
      bio: 'Investigates sustainable technology solutions and evaluates their environmental impact.',
      image: 'https://ui-avatars.com/api/?name=Diana+Namukuve&background=E74C3C&color=fff&size=256',
    },
    {
      name: 'Timothy Oyedepo',
      role: 'Data Analyst',
      bio: 'Specializes in tracking environmental metrics and mapping the impact of device recycling efforts.',
      image: 'https://ui-avatars.com/api/?name=Timothy+Oyedepo&background=3498DB&color=fff&size=256',
    },    {
      name: 'Tolha Najmudeen',
      role: 'Product Owner & Lead Engineer',
      bio: 'Oversees the product vision while developing the website architecture and functionality to ensure it meets both technical requirements and user needs.',
      image: 'https://ui-avatars.com/api/?name=Tolha+Najmudeen&background=F39C12&color=fff&size=256',
    },
  ];

  const values = [
    {
      title: 'Sustainability',
      description: 'We are committed to reducing e-waste and promoting a circular economy for electronic devices.',
      icon: '🌱',
    },
    {
      title: 'Accessibility',
      description: 'We believe everyone deserves access to technology, regardless of economic circumstances.',
      icon: '🔓',
    },
    {
      title: 'Community',
      description: 'We foster connections between donors and recipients, building a community of conscious tech users.',
      icon: '🤝',
    },
    {
      title: 'Innovation',
      description: 'We constantly seek better ways to extend the lifecycle of electronic devices.',
      icon: '💡',
    },
  ];
  return (
    <div className="pt-12">
      {/* Header with gradient */}
      <div className="w-full bg-gradient-to-r from-green-500 to-blue-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl font-bold mb-4">About DetoxIT</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Our mission is to create a sustainable future by extending the lifecycle of electronic devices and making technology accessible to all.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Story</h2>
              <p className="text-lg text-gray-700 mb-6">
                DetoxIT was founded in 2022 with a simple idea: to reduce electronic waste while addressing the digital divide. We noticed that many people and organizations replace functioning devices while others lack access to basic technology.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                What began as a small community initiative has grown into a comprehensive platform connecting device donors with recipients across the country, keeping thousands of devices out of landfills and in the hands of those who need them.
              </p>
              <p className="text-lg text-gray-700">
                Today, we're proud to have facilitated over 1,000 device donations, preventing more than 5,000kg of e-waste while helping schools, nonprofits, and individuals gain access to much-needed technology.
              </p>
            </div>            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80" 
                alt="Electronic devices and components" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} elevated={true}>
                <div className="p-6 text-center">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>      {/* Our Team */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} elevated={true}>
                <div className="p-6">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-center">{member.name}</h3>
                  <p className="text-green-600 text-center mb-3">{member.role}</p>
                  {member.secondaryRole && (
                    <p className="text-blue-500 text-center mb-3 text-sm">{member.secondaryRole}</p>
                  )}
                  <p className="text-gray-600 text-center">{member.bio}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Mission */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Whether you have devices to donate or are in need of technology, you can be part of the solution to electronic waste and digital inequality.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/login">
              <Button variant="primary">Donate a Device</Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary">Request a Device</Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline">Contact Us</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
