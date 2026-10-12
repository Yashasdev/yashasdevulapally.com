"use client";

import { useState } from "react";
import { osModules, thinkingPrompts } from "@/lib/content";

type ModuleId = (typeof osModules)[number]["id"];

const buildNodes = ["Question", "Sketch", "Prototype", "Real thing"];

export function YashasOS() {
  const [active, setActive] = useState<ModuleId>("building");
  const [buildStep, setBuildStep] = useState(0);
  const [compass, setCompass] = useState(18);
  const [rally, setRally] = useState(0);
  const [beat, setBeat] = useState([true, false, false, true, false, true, false, false]);
  const [thought, setThought] = useState(0);
  const activeModule = osModules.find((item) => item.id === active) ?? osModules[0];

  return (
    <div className="os-shell">
      <div className="os-chrome">
        <div className="os-window-controls" aria-hidden="true"><i /><i /><i /></div>
        <span>YASHAS_OS / PERSONAL SYSTEMS</span>
        <span className="os-online"><i /> ONLINE</span>
      </div>

      <div className="os-body">
        <div className="os-tabs" role="tablist" aria-label="Parts of Yashas OS">
          {osModules.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active === item.id}
              aria-controls="os-panel"
              className={active === item.id ? "is-active" : ""}
              onClick={() => setActive(item.id)}
            >
              <span>{item.index}</span>
              {item.label}
            </button>
          ))}
        </div>

        <div id="os-panel" className="os-panel" role="tabpanel" key={active}>
          <div className="os-copy">
            <span className="micro-label">MODE / {activeModule.index}</span>
            <h3>{activeModule.verb}</h3>
            <p>{activeModule.description}</p>
            <div className="os-tags">
              {activeModule.details.map((detail) => <span key={detail}>{detail}</span>)}
            </div>
          </div>

          <div className="os-experience">
            {active === "building" && (
              <div className="build-experience">
                <p className="experience-instruction">Select a stage</p>
                <div className="build-path">
                  {buildNodes.map((node, index) => (
                    <button
                      key={node}
                      type="button"
                      onClick={() => setBuildStep(index)}
                      className={index <= buildStep ? "is-lit" : ""}
                    >
                      <i>{String(index + 1).padStart(2, "0")}</i>
                      <span>{node}</span>
                    </button>
                  ))}
                </div>
                <div className="build-readout">
                  PROGRESS / {Math.round(((buildStep + 1) / buildNodes.length) * 100)}%
                </div>
              </div>
            )}

            {active === "exploring" && (
              <div className="compass-experience">
                <button
                  type="button"
                  className="compass"
                  style={{ "--compass-turn": `${compass}deg` } as React.CSSProperties}
                  onClick={() => setCompass((value) => value + 93)}
                  aria-label="Spin the compass"
                >
                  <span>N</span><span>E</span><span>S</span><span>W</span><i />
                </button>
                <p>Tap the compass. Pick a direction. Figure out the rest later.</p>
              </div>
            )}

            {active === "competing" && (
              <div className="rally-experience">
                <span className="rally-count">{String(rally).padStart(2, "0")}</span>
                <p>RALLY COUNTER</p>
                <div className="rally-actions">
                  <button type="button" onClick={() => setRally((value) => value + 1)}>
                    + KEEP IT UP
                  </button>
                  <button type="button" onClick={() => setRally(0)}>RESET</button>
                </div>
              </div>
            )}

            {active === "creating" && (
              <div className="beat-experience">
                <p className="experience-instruction">Build a visual beat</p>
                <div className="beat-grid" aria-label="Eight-step visual sequencer">
                  {beat.map((isOn, index) => (
                    <button
                      type="button"
                      key={index}
                      className={isOn ? "is-on" : ""}
                      aria-pressed={isOn}
                      aria-label={`Toggle beat ${index + 1}`}
                      onClick={() => setBeat((current) =>
                        current.map((value, i) => (i === index ? !value : value)),
                      )}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                <div className="beat-wave" aria-hidden="true">
                  {beat.map((isOn, index) => <i key={index} className={isOn ? "is-on" : ""} />)}
                </div>
              </div>
            )}

            {active === "thinking" && (
              <div className="thought-experience">
                <span>QUESTION_{String(thought + 1).padStart(2, "0")}</span>
                <blockquote>{thinkingPrompts[thought]}</blockquote>
                <button
                  type="button"
                  onClick={() => setThought((value) => (value + 1) % thinkingPrompts.length)}
                >
                  NEXT THOUGHT ↗
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
