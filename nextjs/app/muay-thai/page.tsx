export default function MuayThai() {
  const events = [
    { date: 'Thursday, 2 July', time: '6:00 PM – 7:00 PM', url: 'https://ns.com/events/xfq37pk2' },
    { date: 'Thursday, 16 July', time: '6:00 PM – 7:00 PM', url: 'https://ns.com/events/0d77cn87' },
    { date: 'Thursday, 23 July', time: '6:00 PM – 7:00 PM', url: 'https://ns.com/events/tomnnmr9' },
    { date: 'Thursday, 30 July', time: '6:00 PM – 7:00 PM', url: 'https://ns.com/events/d6dq7ak9' },
  ];

  const agenda = [
    'Introduction to Muay Thai',
    'QiGong, breathwork, and meditation',
    'Group stretching',
    '7 minutes jump rope',
    '20–50 sit-ups and 20–50 push-ups',
    '5 minutes of shadow boxing',
    '3 rounds × 3 minutes on heavy bags (1-minute rest)',
    'Basic Muay Thai combinations',
    '3 rounds × 3 minutes focusing on one technique (elbows, punches, knees, teeps, or kicks)',
    'Traditional closing bows and handshakes',
  ];

  return (
    <div className="flex justify-center content__container">
      <div className="max-w-3xl w-full">
        <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">
          Muay Thai Training Session (60 Minutes)
        </h1>
        <p className="text-lg text-gray-700 mb-6">All Levels Welcome</p>

        <div className="w-full mb-8">
          <img
            src="/images/ns/muay-thai-main.jpeg"
            alt="Muay Thai training session"
            className="w-full rounded-lg object-cover"
          />
        </div>

        <div className="border rounded-lg p-4 mb-8 bg-gray-50">
          <p className="font-semibold">
            Every Thursday 6PM in the NS Gym
          </p>
          <p className="text-gray-700 mt-3">
            This class is offered on a pay-what-you-can basis to keep it
            accessible to everyone.
          </p>
          <p className="text-gray-700 mt-1">
            Suggested donation: $5-10 USD
          </p>
          <p className="text-gray-700 mt-1">
            Payment methods: Cash (MYR or USD), cryptocurrency, or{' '}
            <a
              href="https://buy.stripe.com/cNi9AUflJ9hj08odQxf7i00"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              stripe payment link
            </a>
          </p>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Upcoming Sessions</h2>
        <ul className="space-y-3 mb-8">
          {events.map((event) => (
            <li
              key={event.url}
              className="flex flex-wrap items-center justify-between gap-2 border rounded-lg p-4"
            >
              <div>
                <p className="font-semibold text-gray-900">{event.date}</p>
                <p className="text-gray-700 text-sm">{event.time}</p>
              </div>
              <a
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline whitespace-nowrap"
              >
                Register
              </a>
            </li>
          ))}
        </ul>

        <p className="text-gray-700 mb-4">
          Martial arts are a powerful practice for developing both physical
          capability and mental resilience. It is especially valuable for
          entrepreneurs, creative technologists and knowledge workers. Training
          enhances confidence, self-defense skills, self-reliance, discipline,
          and overall strength of body and mind.
        </p>
        <p className="text-gray-700 mb-8">
          Please wear comfortable gym clothing. If you have personal martial
          arts equipment (boxing gloves, hand wraps, pads), you are encouraged
          to bring it.
        </p>

        <h2 className="text-2xl font-semibold mb-2">Class Agenda</h2>
        <p className="text-gray-700 mb-4">6:00 PM – Start Sharp</p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-8">
          {agenda.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h2 className="text-2xl font-semibold mb-2">Trainer</h2>
        <p className="text-gray-700 mb-2">
          Konrad – Over two years of Muay Thai training across Thailand, San
          Francisco, Vietnam, and Bali; additionally trained in Taekwondo and
          Kung Fu.
        </p>
        <p className="text-gray-600 text-sm italic mb-8">
          Note: I serve solely as a facilitator and instructor of the
          techniques, forms, and practices I have been taught through my own
          martial arts training and experience.
        </p>

        <h2 className="text-2xl font-semibold mb-2">Training Disclaimer</h2>
        <p className="text-gray-700 mb-4">
          Participation in Muay Thai training involves inherent physical risks,
          including but not limited to bruises, sprains, strains, muscle
          soreness, and potentially more serious injuries such as back injuries
          or ligament tears. By taking part in any training session, you
          acknowledge that these risks exist and voluntarily assume full
          responsibility for any injuries or health concerns that may arise.
        </p>
        <p className="text-gray-700 mb-8">
          By attending and participating in training, you confirm that you have
          read, understood, and agreed to the terms of this disclaimer.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <img
            src="/images/ns/muay-thai-1.png"
            alt="Muay Thai training"
            className="w-full rounded-lg object-cover aspect-square"
          />
          <img
            src="/images/ns/muay-thai-2.png"
            alt="Muay Thai training"
            className="w-full rounded-lg object-cover aspect-square"
          />
        </div>
      </div>
    </div>
  );
}
