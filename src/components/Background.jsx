import Particles from "./Particles";

export default function Background() {
  return (
    <div className="fixed inset-0 w-full h-full bg-black -z-10">
      <Particles
        particleColors={["#ffffff", "#FF9FFC", "#392e4e"]} // Mixed white, pink, and deep purple
        particleCount={300}
        particleSpread={12}
        speed={0.1}
        particleBaseSize={120}
        moveParticlesOnHover={true}
        particleHoverFactor={1.5}
        alphaParticles={true}
        disableRotation={false}
      />
    </div>
  );
}