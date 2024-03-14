import { useEffect, useState } from 'react';
import useAxios from '../../../hooks/useAxios';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';

type ContactData = {
  data: {
    data: {
      businessProfile?: {
        email?: string;
      },
      id: {
        server: string;
        user: string;
        _serialized: string;
      },
      isBussiness: boolean;
      user: string;
      verifiedName: string;
      name: string;
      profilePicUrl?: string;
    };
    phone: string;
  };
};

type ProfilePicsMap = {
  [contactId: string]: string;
};

const SendMessage = () => {
  const [contactsData, setContactsData] = useState<ContactData[]>([]);
  const [profilePics, setProfilePics] = useState<ProfilePicsMap>({});

  const getContacts = async (contactIds: string[]) => {
    const requests = contactIds.map(id =>
      useAxios.post('/get-contact-by-id', { contactId: id })
        .then(response => response.data)
        .catch(error => console.error('Error fetching contact:', id, error))
    );

    const results = await Promise.all(requests);
    console.log(results)
    setContactsData(results.filter(result => result !== undefined));
  }

  const getProfilePics = async (contactIds: string[]) => {
    const requests = contactIds.map(id =>
      useAxios.post('/get-profile-pic-url', { contactId: id })
        .then(response => ({ contactId: id, ...response.data }))
        .catch(error => {
          console.error('Error fetching profile pic:', id, error);
          return null;
        })
    );

    const results = await Promise.all(requests);
    console.log(results)
    const picsMap: ProfilePicsMap = {};
    results.forEach(result => {
      if (result) {
        picsMap[result.contactId] = result.data.data.profilePicUrl;
      }
    });
    setProfilePics(picsMap);
  }

  useEffect(() => {
    const contactIds = ['50259230213@c.us', '50255143906@c.us', '50237642537@c.us'];
    getContacts(contactIds);
    getProfilePics(contactIds);
  }, []);

  return (
    <div className="flex-1 md:py-2 md:px-5 flex font-Montserrat xs:gap-5">
      <div className='md:w-1/3 md:h-2/3 grid grid-cols-2 xs:gap-5'>
        {
          contactsData.map((contact, index) => (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .5, delay: index * 0.7, type: 'spring', stiffness: 100, damping: 10 }}
              key={contact.data.data.id._serialized} className="flex flex-col w-full
            bg-gray-100 rounded-xl shadow-sm xs:p-10 hover:shadow-xl transition-shadow duration-500 hover:cursor-pointer
            ">
              <div className='flex-1 flex flex-col xs:gap-3 justify-between items-center  xs:h-5'>
                <div className='relative group'>
                  {/** Avatar */}
                  <div className='relative flex flex-col justify-center items-center'>
                    <img src={profilePics[contact.data.data.id._serialized]} alt="profile-pic" className="w-20 h-20 rounded-lg self-center shadow-lg" />
                    <div className='absolute bottom-0 right-0 translate-x-2 translate-y-1 bg-prussian-blue-500 w-7 h-7 rounded-md xs:p-2 text-xs text-white
                  flex justify-center items-center font-bold'> {contact.data.data.verifiedName?.split('', 1)}
                   </div>
                  
                  </div>
                </div>
                {/** Name Contact */}
                <h3 className="font-bold text-sm xs:mb-5 text-center">{contact.data.data.verifiedName ? contact.data.data.verifiedName : contact.data.data.name}</h3>
                {/** Contact info */}
                <div className='flex flex-col items-start xs:gap-3'>
                  <div className='flex justify-start items-center xs:gap-2'>
                    <FontAwesomeIcon icon={faPhone} className='text-white text-xs bg-prussian-blue-300 xs:p-1 rounded-md' />
                    <p className='text-xs'>{contact.data.data.id.user.split('502', 2)}</p>
                  </div>
                  <div className='flex justify-start items-center xs:gap-2'>
                    <FontAwesomeIcon icon={faEnvelope} className='text-white text-xs bg-prussian-blue-300 xs:p-1 rounded-md' />
                    <p className='text-xs'>{contact.data.data?.businessProfile?.email ?
                      contact.data.data.businessProfile.email : 'No disponible'}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        }
      </div>
      <div className='flex-1 border-l-2 border-zinc-300 xs:p-4'>mensaje</div>
    </div>
  );
}

export default SendMessage;
