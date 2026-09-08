import { useRef, useEffect } from 'react';

function FloatingVisuals() {
  const stageRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;

    const items = Array.from(stage.querySelectorAll('[data-float]'));

    const onMove = (e) => {
      const rect = stage.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / rect.width - 0.5;
      const cy = (e.clientY - rect.top) / rect.height - 0.5;

      items.forEach((el, i) => {
        const depth = (i + 1) * 0.12;
        el.style.transform = `translate(${cx * 40 * depth}px, ${cy * 30 * depth}px) rotate(${cx * 3}deg)`;
      });
    };

    stage.addEventListener('mousemove', onMove);
    return () => stage.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div ref={stageRef} className="floating-stage" aria-hidden="true">
      <div className="float-item float-item--video" data-float>
        <img
          src="https://images.pexels.com/photos/3692641/pexels-photo-3692641.jpeg?auto=compress&cs=tinysrgb&w=400"
          alt=""
          loading="eager"
          draggable={false}
        />
      </div>
      <div className="float-item float-item--photo" data-float>
        <img
          src="https://images.pexels.com/photos/2272760/pexels-photo-2272760.jpeg?auto=compress&cs=tinysrgb&w=400"
          alt=""
          loading="eager"
          draggable={false}
        />
      </div>
      <div className="float-item float-item--code" data-float>
        <span className="code-accent">const</span> motion = {'{\n'}
        {'  '}stiffness: <span className="code-accent">120</span>,{'\n'}
        {'  '}damping: <span className="code-accent">14</span>{'\n'}
        {'};'}
      </div>
    </div>
  );
}

export default FloatingVisuals;
