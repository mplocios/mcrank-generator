import React, { useState, useRef, useEffect } from 'react';

const Ranks = () => {
  const [text, setText] = useState('RANK');
  const [prefix, setPrefix] = useState('I');
  const [prefixEnabled, setPrefixEnabled] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState('#065f46');
  const [borderColor, setBorderColor] = useState('#10b981');
  const [shadowColor, setShadowColor] = useState('#065f46');
  const [textColor, setTextColor] = useState('#ffffff');
  const [borderEnabled, setBorderEnabled] = useState(true);
  const [borderRadius, setBorderRadius] = useState(false);
  const [shadowEnabled, setShadowEnabled] = useState(true);
  const [shadowOffsetX, setShadowOffsetX] = useState(1);
  const [shadowOffsetY, setShadowOffsetY] = useState(1);
  const [selectedPreset, setSelectedPreset] = useState('');
  const [displayScale, setDisplayScale] = useState(10);
  const [prefixGap, setPrefixGap] = useState(-1);
  const [prefixBoxSize, setPrefixBoxSize] = useState(7);

  const canvasRef = useRef(null);

  const presets = [
    { name: 'Classic', bg: '#3a3a3a', border: '#6b7280', shadow: '#3a3a3a' },
    { name: 'Emerald', bg: '#065f46', border: '#10b981', shadow: '#065f46' },
    { name: 'Gold', bg: '#92400e', border: '#fbbf24', shadow: '#92400e' },
    { name: 'Nether', bg: '#7f1d1d', border: '#dc2626', shadow: '#7f1d1d' },
    { name: 'Ice', bg: '#0c4a6e', border: '#38bdf8', shadow: '#0c4a6e' },
    { name: 'Diamond', bg: '#1e3a8a', border: '#60a5fa', shadow: '#1e3a8a' },
    { name: 'Ruby', bg: '#881337', border: '#f43f5e', shadow: '#881337' },
    { name: 'Amethyst', bg: '#581c87', border: '#a855f7', shadow: '#581c87' },
    { name: 'Obsidian', bg: '#1c1917', border: '#44403c', shadow: '#1c1917' },
    { name: 'Sandstone', bg: '#78350f', border: '#fbbf24', shadow: '#78350f' },
  ];

  const drawMinecraftText = (ctx, text, x, y, scale = 1, charSpacing = 1, isPrefix = false) => {
    const font = {
      'A': [[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,1]],
      'B': [[1,1,1,1,0],[1,0,0,0,1],[1,1,1,1,0],[1,0,0,0,1],[1,1,1,1,0]],
      'C': [[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,0],[1,0,0,0,1],[0,1,1,1,0]],
      'D': [[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0]],
      'E': [[1,1,1,1,1],[1,0,0,0,0],[1,1,1,1,0],[1,0,0,0,0],[1,1,1,1,1]],
      'F': [[1,1,1,1,1],[1,0,0,0,0],[1,1,1,1,0],[1,0,0,0,0],[1,0,0,0,0]],
      'G': [[0,1,1,1,1],[1,0,0,0,0],[1,0,1,1,1],[1,0,0,0,1],[0,1,1,1,0]],
      'H': [[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,1],[1,0,0,0,1]],
      'I': [[1,1,1],[0,1,0],[0,1,0],[0,1,0],[1,1,1]],
      'I_THIN': [[1],[1],[1],[1],[1]],
      'J': [[0,1,1,1,1],[0,0,0,1,0],[0,0,0,1,0],[1,0,0,1,0],[0,1,1,0,0]],
      'K': [[1,0,0,0,1],[1,0,0,1,0],[1,1,1,0,0],[1,0,0,1,0],[1,0,0,0,1]],
      'L': [[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,1]],
      'M': [[1,0,0,0,1],[1,1,0,1,1],[1,0,1,0,1],[1,0,0,0,1],[1,0,0,0,1]],
      'N': [[1,0,0,0,1],[1,1,0,0,1],[1,0,1,0,1],[1,0,0,1,1],[1,0,0,0,1]],
      'O': [[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],
      'P': [[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0],[1,0,0,0,0]],
      'Q': [[0,1,1,1,0],[1,0,0,0,1],[1,0,1,0,1],[1,0,0,1,0],[0,1,1,0,1]],
      'R': [[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0],[1,0,0,0,1]],
      'S': [[0,1,1,1,1],[1,0,0,0,0],[0,1,1,1,0],[0,0,0,0,1],[1,1,1,1,0]],
      'T': [[1,1,1,1,1],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0]],
      'U': [[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],
      'V': [[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,0,1,0],[0,0,1,0,0]],
      'W': [[1,0,0,0,1],[1,0,0,0,1],[1,0,1,0,1],[1,1,0,1,1],[1,0,0,0,1]],
      'X': [[1,0,0,0,1],[0,1,0,1,0],[0,0,1,0,0],[0,1,0,1,0],[1,0,0,0,1]],
      'Y': [[1,0,0,0,1],[0,1,0,1,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0]],
      'Z': [[1,1,1,1,1],[0,0,0,1,0],[0,0,1,0,0],[0,1,0,0,0],[1,1,1,1,1]],
      ' ': [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]],
      '0': [[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],
      '1': [[0,1,0],[1,1,0],[0,1,0],[0,1,0],[1,1,1]],
      '2': [[0,1,1,0],[1,0,0,1],[0,0,1,0],[0,1,0,0],[1,1,1,1]],
      '3': [[1,1,1,1,0],[0,0,0,0,1],[0,1,1,1,0],[0,0,0,0,1],[1,1,1,1,0]],
      '4': [[0,0,0,1,0],[0,0,1,1,0],[0,1,0,1,0],[1,1,1,1,1],[0,0,0,1,0]],
      '5': [[1,1,1,1,1],[1,0,0,0,0],[1,1,1,1,0],[0,0,0,0,1],[1,1,1,1,0]],
      '6': [[0,1,1,1,0],[1,0,0,0,0],[1,1,1,1,0],[1,0,0,0,1],[0,1,1,1,0]],
      '7': [[1,1,1,1,1],[0,0,0,0,1],[0,0,0,1,0],[0,0,1,0,0],[0,0,1,0,0]],
      '8': [[0,1,1,1,0],[1,0,0,0,1],[0,1,1,1,0],[1,0,0,0,1],[0,1,1,1,0]],
      '9': [[0,1,1,1,0],[1,0,0,0,1],[0,1,1,1,1],[0,0,0,0,1],[0,1,1,1,0]],
    };

    let currentX = x;
    const upperText = text.toUpperCase();
    const isSoloI = text === 'I'; // Check if the entire text is just "I"

    for (let i = 0; i < upperText.length; i++) {
      const char = upperText[i];
      let pattern;
      
      // Only use thin I if:
      // 1. It's in the prefix (isPrefix = true)
      // 2. AND it's NOT a solo "I" (isSoloI = false)
      if (char === 'I' && isPrefix && !isSoloI) {
        pattern = font['I_THIN'];
      } else {
        pattern = font[char] || font[' '];
      }

      for (let row = 0; row < pattern.length; row++) {
        for (let col = 0; col < pattern[row].length; col++) {
          if (pattern[row][col]) {
            ctx.fillRect(
              currentX + col * scale,
              y + row * scale,
              scale,
              scale
            );
          }
        }
      }

      const charWidth = pattern[0].length;
      currentX += (charWidth + charSpacing) * scale;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const textScale = 1;
    const charSpacing = 1;
    const paddingX = 2;
    const paddingY = 2;

    const font = {
      'A': [[1,1,1,1,1]],
      'B': [[1,1,1,1,1]],
      'C': [[1,1,1,1,1]],
      'D': [[1,1,1,1,1]],
      'E': [[1,1,1,1,1]],
      'F': [[1,1,1,1,1]],
      'G': [[1,1,1,1,1]],
      'H': [[1,1,1,1,1]],
      'I': [[1,1,1]],
      'I_THIN': [[1]],
      'J': [[1,1,1,1,1]],
      'K': [[1,1,1,1,1]],
      'L': [[1,1,1,1,1]],
      'M': [[1,1,1,1,1]],
      'N': [[1,1,1,1,1]],
      'O': [[1,1,1,1,1]],
      'P': [[1,1,1,1,1]],
      'Q': [[1,1,1,1,1]],
      'R': [[1,1,1,1,1]],
      'S': [[1,1,1,1,1]],
      'T': [[1,1,1,1,1]],
      'U': [[1,1,1,1,1]],
      'V': [[1,1,1,1,1]],
      'W': [[1,1,1,1,1]],
      'X': [[1,1,1,1,1]],
      'Y': [[1,1,1,1,1]],
      'Z': [[1,1,1,1,1]],
      ' ': [[0,0,0]],
      '0': [[0,1,1,1,0]],
      '1': [[1,1,0]],
      '2': [[0,1,1,1]],
      '3': [[1,1,1,1,0]],
      '4': [[0,0,0,1,0]],
      '5': [[1,1,1,1,1]],
      '6': [[0,1,1,1,0]],
      '7': [[1,1,1,1,1]],
      '8': [[0,1,1,1,0]],
      '9': [[0,1,1,1,0]],
    };
    
    let prefixWidth = 0;
    const isSoloI = prefix === 'I';
    
    if (prefixEnabled && prefix) {
      const upperPrefix = prefix.toUpperCase();
      for (let i = 0; i < upperPrefix.length; i++) {
        const char = upperPrefix[i];
        let charWidth;
        if (char === 'I' && !isSoloI) {
          charWidth = font['I_THIN'][0].length;
        } else {
          charWidth = (font[char] || font[' '])[0].length;
        }
        prefixWidth += charWidth;
        if (i < upperPrefix.length - 1) {
          prefixWidth += charSpacing;
        }
      }
    }

    // Calculate main text width (always use regular I, never thin)
    let textWidth = 0;
    const upperText = text.toUpperCase();
    for (let i = 0; i < upperText.length; i++) {
      const char = upperText[i];
      const charWidth = (font[char] || font[' '])[0].length;
      textWidth += charWidth;
      if (i < upperText.length - 1) {
        textWidth += charSpacing;
      }
    }
    
    const prefixBoxFixedWidth = prefixBoxSize;
    const prefixBoxWidth = prefixEnabled && prefix ? prefixBoxFixedWidth + paddingX * 2 : 0;
    const mainBoxWidth = textWidth + paddingX * 2;
    const prefixToMainGap = prefixGap;
    const totalWidth = prefixBoxWidth + (prefixEnabled && prefix ? prefixToMainGap : 0) + mainBoxWidth;
    const totalHeight = 5 + paddingY * 2;

    canvas.width = totalWidth;
    canvas.height = totalHeight;

    ctx.clearRect(0, 0, totalWidth, totalHeight);

    const textY = paddingY;
    let currentX = 0;

    // Draw prefix box if enabled
    if (prefixEnabled && prefix) {
      // Prefix background
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(currentX, 0, prefixBoxWidth, totalHeight);

      // Remove background corners if rounded
      if (borderRadius) {
        ctx.clearRect(currentX, 0, 1, 1);
        ctx.clearRect(currentX + prefixBoxWidth - 1, 0, 1, 1);
        ctx.clearRect(currentX, totalHeight - 1, 1, 1);
        ctx.clearRect(currentX + prefixBoxWidth - 1, totalHeight - 1, 1, 1);
      }

      // Prefix border
      if (borderEnabled) {
        ctx.fillStyle = borderColor;
        ctx.fillRect(currentX, 0, prefixBoxWidth, 1);
        ctx.fillRect(currentX, totalHeight - 1, prefixBoxWidth, 1);
        ctx.fillRect(currentX, 0, 1, totalHeight);
        ctx.fillRect(currentX + prefixBoxWidth - 1, 0, 1, totalHeight);
        
        if (borderRadius) {
          ctx.clearRect(currentX, 0, 1, 1);
          ctx.clearRect(currentX + prefixBoxWidth - 1, 0, 1, 1);
          ctx.clearRect(currentX, totalHeight - 1, 1, 1);
          ctx.clearRect(currentX + prefixBoxWidth - 1, totalHeight - 1, 1, 1);
        }
      }

      const prefixStartX = currentX + paddingX + Math.floor((prefixBoxFixedWidth - prefixWidth) / 2);

      if (shadowEnabled) {
        ctx.fillStyle = shadowColor;
        drawMinecraftText(ctx, prefix, prefixStartX + shadowOffsetX, textY + shadowOffsetY, textScale, charSpacing, true);
      }
      ctx.fillStyle = textColor;
      drawMinecraftText(ctx, prefix, prefixStartX, textY, textScale, charSpacing, true);
      
      currentX += prefixBoxWidth + prefixToMainGap;
    }

    // Draw main text box
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(currentX, 0, mainBoxWidth, totalHeight);

    if (borderRadius) {
      ctx.clearRect(currentX, 0, 1, 1);
      ctx.clearRect(currentX + mainBoxWidth - 1, 0, 1, 1);
      ctx.clearRect(currentX, totalHeight - 1, 1, 1);
      ctx.clearRect(currentX + mainBoxWidth - 1, totalHeight - 1, 1, 1);
    }

    if (borderEnabled) {
      ctx.fillStyle = borderColor;
      ctx.fillRect(currentX, 0, mainBoxWidth, 1);
      ctx.fillRect(currentX, totalHeight - 1, mainBoxWidth, 1);
      ctx.fillRect(currentX, 0, 1, totalHeight);
      ctx.fillRect(currentX + mainBoxWidth - 1, 0, 1, totalHeight);
      
      if (borderRadius) {
        ctx.clearRect(currentX, 0, 1, 1);
        ctx.clearRect(currentX + mainBoxWidth - 1, 0, 1, 1);
        ctx.clearRect(currentX, totalHeight - 1, 1, 1);
        ctx.clearRect(currentX + mainBoxWidth - 1, totalHeight - 1, 1, 1);
      }
    }

    if (shadowEnabled) {
      ctx.fillStyle = shadowColor;
      drawMinecraftText(ctx, text, currentX + paddingX + shadowOffsetX, textY + shadowOffsetY, textScale, charSpacing, false);
    }

    ctx.fillStyle = textColor;
    drawMinecraftText(ctx, text, currentX + paddingX, textY, textScale, charSpacing, false);

  }, [text, prefix, prefixEnabled, backgroundColor, borderColor, shadowColor, textColor, borderEnabled, borderRadius, shadowEnabled, shadowOffsetX, shadowOffsetY, prefixGap, prefixBoxSize]);

  const applyPreset = (preset) => {
    setBackgroundColor(preset.bg);
    setBorderColor(preset.border);
    setShadowColor(preset.shadow);
    setSelectedPreset(preset.name);
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const filename = prefixEnabled && prefix 
        ? `${prefix.toLowerCase()}-${text.toLowerCase().replace(/\s+/g, '-')}-rank.png`
        : `${text.toLowerCase().replace(/\s+/g, '-')}-rank.png`;
      link.download = filename;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center mb-6 text-indigo-400">Minecraft Rank Generator</h1>
          
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value.toUpperCase())}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded mb-6 text-xl font-bold text-center"
            placeholder="Enter text..."
            maxLength={20}
          />

          <div className="mb-6 flex items-center gap-4 bg-gray-700 p-4 rounded">
            <label className="text-sm font-semibold">Prefix:</label>
            <input
              type="checkbox"
              checked={prefixEnabled}
              onChange={(e) => setPrefixEnabled(e.target.checked)}
              className="w-5 h-5 cursor-pointer accent-indigo-600"
            />
            {prefixEnabled && (
              <>
                <select
                  value={prefix}
                  onChange={(e) => setPrefix(e.target.value)}
                  className="bg-gray-600 text-white px-4 py-2 rounded cursor-pointer border border-gray-500"
                >
                  <option value="I">I</option>
                  <option value="II">II</option>
                  <option value="III">III</option>
                  <option value="IV">IV</option>
                  <option value="V">V</option>
                  <option value="VI">VI</option>
                  <option value="VII">VII</option>
                  <option value="VIII">VIII</option>
                  <option value="IX">IX</option>
                  <option value="X">X</option>
                </select>
                <div className="flex items-center gap-2">
                  <label className="text-xs">Gap:</label>
                  <input
                    type="number"
                    min="-5"
                    max="20"
                    value={prefixGap}
                    onChange={(e) => setPrefixGap(+e.target.value)}
                    className="bg-gray-600 text-white px-2 py-1 rounded w-16 border border-gray-500"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs">Width:</label>
                  <input
                    type="number"
                    min="5"
                    max="30"
                    value={prefixBoxSize}
                    onChange={(e) => setPrefixBoxSize(+e.target.value)}
                    className="bg-gray-600 text-white px-2 py-1 rounded w-16 border border-gray-500"
                  />
                </div>
              </>
            )}
          </div>

          <div className="bg-gray-700 rounded p-4 mb-6 overflow-auto" style={{ width: '100%', height: '300px' }}>
            <canvas
              ref={canvasRef}
              style={{
                imageRendering: 'pixelated',
                transform: `scale(${displayScale})`,
                transformOrigin: 'top left',
                display: 'block',
              }}
            />
          </div>

          <div className="mb-4 flex items-center gap-2">
            <label className="text-sm">Preview Scale:</label>
            <input
              type="range"
              min="1"
              max="20"
              value={displayScale}
              onChange={(e) => setDisplayScale(+e.target.value)}
              className="flex-1"
            />
            <span className="text-xs text-gray-400">{displayScale}×</span>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm">Text Color:</label>
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-16 h-10 rounded cursor-pointer bg-transparent"
              />
              <span className="text-xs text-gray-400">{textColor}</span>
            </div>

            <div className="flex items-center gap-4">
              <label className="w-32 text-sm">Background:</label>
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="w-16 h-10 rounded cursor-pointer bg-transparent"
              />
              <span className="text-xs text-gray-400">{backgroundColor}</span>
            </div>

            <div className="flex items-center gap-4">
              <label className="w-32 text-sm">Border:</label>
              <input
                type="color"
                value={borderColor}
                onChange={(e) => setBorderColor(e.target.value)}
                className="w-16 h-10 rounded cursor-pointer bg-transparent"
              />
              <input
                type="checkbox"
                checked={borderEnabled}
                onChange={(e) => setBorderEnabled(e.target.checked)}
                className="w-5 h-5 cursor-pointer accent-indigo-600"
              />
              <label className="text-xs">Rounded:</label>
              <input
                type="checkbox"
                checked={borderRadius}
                onChange={(e) => setBorderRadius(e.target.checked)}
                className="w-5 h-5 cursor-pointer accent-indigo-600"
              />
              <span className="text-xs text-gray-400">{borderColor}</span>
            </div>

            <div className="flex items-center gap-4">
              <label className="w-32 text-sm">Shadow:</label>
              <input
                type="color"
                value={shadowColor}
                onChange={(e) => setShadowColor(e.target.value)}
                className="w-16 h-10 rounded cursor-pointer bg-transparent"
              />
              <input
                type="checkbox"
                checked={shadowEnabled}
                onChange={(e) => setShadowEnabled(e.target.checked)}
                className="w-5 h-5 cursor-pointer accent-indigo-600"
              />
              {shadowEnabled && (
                <>
                  <label className="text-xs">X:</label>
                  <input
                    type="number"
                    min="-5"
                    max="5"
                    value={shadowOffsetX}
                    onChange={(e) => setShadowOffsetX(+e.target.value)}
                    className="bg-gray-600 text-white px-2 py-1 rounded w-14 border border-gray-500"
                  />
                  <label className="text-xs">Y:</label>
                  <input
                    type="number"
                    min="-5"
                    max="5"
                    value={shadowOffsetY}
                    onChange={(e) => setShadowOffsetY(+e.target.value)}
                    className="bg-gray-600 text-white px-2 py-1 rounded w-14 border border-gray-500"
                  />
                </>
              )}
              <span className="text-xs text-gray-400">{shadowColor}</span>
            </div>

            <div className="flex items-center gap-4">
              <label className="w-32 text-sm">Preset:</label>
              <select
                value={selectedPreset}
                onChange={(e) => {
                  const preset = presets.find((p) => p.name === e.target.value);
                  if (preset) applyPreset(preset);
                }}
                className="bg-gray-700 text-white px-4 py-2 rounded cursor-pointer flex-1 border border-gray-600"
              >
                <option value="">Select preset</option>
                {presets.map((preset) => (
                  <option key={preset.name} value={preset.name}>
                    {preset.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={downloadImage}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded transition-colors"
          >
            Download PNG
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ranks;