export default function Yoga() {
  const benefits = [
    {
      title: 'Build strength & flexibility.',
      body: 'A full-body practice, from sun salutations to deep backbends and balances.',
    },
    {
      title: 'Quiet a busy mind.',
      body: 'Breath-linked movement settles mental chatter for a full, unhurried hour.',
    },
    {
      title: 'Sharpen balance & focus.',
      body: 'Standing balances and inversions train steadiness and real concentration.',
    },
    {
      title: 'Reset your nervous system.',
      body: 'The closing Yoga Nidra drops you into deep, conscious, restorative rest.',
    },
    {
      title: 'Sleep & stress relief.',
      body: '"Yogic sleep" is studied for easing anxiety, tension, and insomnia.',
    },
    {
      title: 'Come exactly as you are.',
      body: 'Every pose is guided, with easier options offered. No experience needed.',
    },
  ];

  const sequence = [
    {
      title: '1. Centering, 3 min',
      body: 'Seated breath and a quiet intention to begin, settling the soft ocean breath (ujjayi).',
    },
    {
      title: '2. Warm-up, 7 min',
      body: "Neck and shoulder rolls, cat-cow, Child's Pose, and a first Downward-Facing Dog.",
    },
    {
      title: '3. Sun Salutations, 8 min',
      body: 'Three to five flowing rounds of Surya Namaskar: forward fold, lunge, plank, Cobra / Upward Dog, Down Dog, to build heat.',
    },
    {
      title: '4. Standing & Balance, 11 min',
      body: 'Warrior II and Warrior I, then Half Moon and Eagle for strength and steadiness.',
    },
    {
      title: '5. Peak: Inversions & Arm Balance, 10 min',
      body: "Dolphin to warm the shoulders, then Crow and Headstand at the wall, resting in Child's Pose.",
    },
    {
      title: '6. Backbends, 6 min',
      body: 'Cobra, Upward Dog, and the full Wheel backbend, or gentle Bridge, to open the front body.',
    },
    {
      title: '7. Cooling Floor, 5 min',
      body: 'Plow, Happy Baby, and a gentle reclined twist to wind the body down.',
    },
    {
      title: '8. Yoga Nidra, 10 min',
      body: 'A guided "yogic sleep" in Savasana, the deep, restful close to the hour.',
    },
  ];

  return (
    <div className="flex justify-center content__container">
      <div className="max-w-3xl w-full">
        <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">
          Hatha Yoga Flow + Yoga Nidra
        </h1>

        <div className="w-full mb-8">
          <img
            src="/images/ns/yoga-ns-flier.jpg"
            alt="Yoga session flier"
            className="w-full rounded-lg object-cover"
          />
        </div>

        <p className="text-gray-700 mb-6">
          A Hatha yoga flow that rises through balance and inversions, then sets
          into a 10-minute Yoga Nidra rest.
        </p>

        <div className="border rounded-lg p-4 mb-8 bg-gray-50">
          <p className="font-semibold">
            Every Sunday 10am in Longtermer Lounge (weather permitting)
          </p>
          <p className="text-gray-700 mt-1">
            Drop-in · All levels · 60 minutes
          </p>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Why spend the hour</h2>
        <ul className="space-y-3 text-gray-700 mb-8">
          {benefits.map((benefit) => (
            <li key={benefit.title}>
              <span className="font-semibold text-gray-900">
                {benefit.title}
              </span>{' '}
              {benefit.body}
            </li>
          ))}
        </ul>

        <h2 className="text-2xl font-semibold mb-4">
          The full sequence · 60 minutes
        </h2>
        <ol className="space-y-4 text-gray-700 mb-8">
          {sequence.map((step) => (
            <li key={step.title}>
              <span className="font-semibold text-gray-900 block">
                {step.title}
              </span>
              {step.body}
            </li>
          ))}
        </ol>

        <h2 className="text-2xl font-semibold mb-2">
          About the Yoga Nidra close
        </h2>
        <p className="text-gray-700 mb-12">
          Yoga Nidra is a guided meditation done lying down, the body completely
          still while the mind stays gently aware. Ten minutes can feel like a
          long, deep rest, leaving you calmer and clearer than when you walked
          in. It&apos;s the reason people come back.
        </p>

        <div className="w-full mb-12">
          <img
            src="/images/ns/yoga-1.png"
            alt="Yoga practice"
            className="w-full rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
}
