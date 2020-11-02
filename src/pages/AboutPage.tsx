import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <main className="about-us">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#1c20294d',
          height: '100%',
          overflow: 'scroll',
          fontFamily: 'serif',
        }}
      >
        <h1 style={{ marginBottom: '30px', textAlign: 'center' }}>
          Billie - Mission 2120
        </h1>
        <p>
          So we finally made it to the Red planet. Our issues may not be as
          political as outlined in Bradbury’s chronicles, or as schizophrenic as
          Philip Dick has imagined, but they are real and they need to be
          addressed before starting our Martian business.
        </p>

        <h2>Cosmic and Sun radiation</h2>
        <p>
          Earth's magnetosphere protects us from space radiation, but Mars does
          not have one. It also receives more solar radiation than the Earth,
          since its atmosphere is quite thinner. Therefore, the human body gets
          two kinds of radiation in Mars that may represent severe health
          problems. Every cell in the body is exposed to damage, leading to
          mutations or even cancer. Radiation affects the DNA, modifies the
          cardiovascular system and damages the heart, between many other
          issues. Therefore, our offices should be built with thick and highly
          effective shielding materials. .
        </p>

        <h2>Gravity</h2>
        <p>
          Our muscles and bones are daily molded by the force of the gravity of
          the Earth, which maintains our physiology. Our Martian team would have
          to struggle with the little gravity in Mars, about one-third the
          gravity of the Earth, given the red planet's smaller mass. Our Mars
          branch office should have an artificial gravitational field that is
          similar to that on earth.
        </p>

        <h2>Temperature</h2>
        <p>
          Although many people think Mars is hot, since it is farther from the
          sun and its atmosphere is thinner than that of the Earth, the heat of
          the day disperses at night. Mars temperature may vary between -140 ºC
          up to 20 ºC, and its average is -60ºC. The human body cannot function
          well under excessively cold temperatures, that is why our office
          should have a central heating system.
        </p>

        <h2>Oxygen supply</h2>
        <p>
          Mars' atmosphere is made of 95 percent carbon dioxide. Our staff would
          need fresh oxygen to survive, that is why our offices must have oxygen
          generators, which can convert carbon dioxide into oxygen, or water
          into hydrogen and oxygen through a process called electrolysis.
        </p>

        <h2>Water supply</h2>
        <p>
          It will not be suitable to regularly send water supplies from Earth,
          since their costs are prohibitive and it will take the spacecraft
          eight months to reach Mars, which is quite impractical. A possible
          solution is to obtain water from Mars’ soil.
        </p>

        <h2>Psychological issues</h2>
        <p>
          Being so far from Earth may cause psychological issues in our crew,
          such as depression, behavioural changes, irritability and sleep or
          concentration problems. Our office should be equipped with
          well-trained psychologists that can cope with these issues and can
          also organize shared activities that can keep the cohesion and
          wellness of our team.
        </p>

        <h2>Overall health issues</h2>
        <p>
          A person who is inactive for an extended period of time suffers
          muscle, bone mass and strength loss, increasing health issues between
          the members of the team. A possible solution would be to have an
          in-company fitness center to keep our team healthy and cheerful. An
          In-company doctor would also be suitable in order to detect any health
          issues and provide quick solutions in addition to regular preventive
          check-ups.
        </p>

        <h2>Dietary deficiencies</h2>
        <p>
          A poor diet may harm the brain and affect our employees' mood. Fresh
          fruit, nuts and dark chocolate, among other healthy snacks, should be
          available in the office’s canteen, considering that they supply
          required nutrients.
        </p>
      </div>
    </main>
  );
};

export default AboutPage;
