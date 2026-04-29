// Function to check login and connection status
function checkAccess() {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
  const isOnline = navigator.onLine;

  if (!isLoggedIn || !isOnline) {
    // Clear login if offline or not logged in
    sessionStorage.removeItem("isLoggedIn");
    window.location.href = "../login/";
  }
}
sessionStorage.setItem("isLoggedIn", "true");

// ======= NEW FUNCTION: Fix Nepali spacing issues =======
function fixNepaliSpacing(text) {
  if (!text) return text;
  // Fix common spacing issues in Nepali text
  return text
    .replace(/hamrosewa/gi, 'hamro sewa')
    .replace(/abharudha/gi, 'abharuddha')
    .replace(/abharuddha\s+vayeko/gi, 'abharuddha vayeko')
    .replace(/hamro\s+sewa/gi, 'hamro sewa')
    .replace(/\s+/g, ' ')  // Normalize multiple spaces
    .trim();
}

// ======= NEW FUNCTION: Remove word from Nepali outage template =======
// ======= UPDATED: Remove word from Nepali outage template =======
function removeWordFromNepaliOutageTemplate(text) {
  /**
   * Removes words one by one from Nepali outage templates when exceeding 160 characters
   */
  
  // First fix spacing
  let processedText = fixNepaliSpacing(text);
  
  // Check if we need to remove words
  if (processedText.length <= 160) {
    return {text: processedText, changed: false};
  }
  
  console.log("Original text length:", processedText.length);
  console.log("Original text:", processedText);
  
  // Split text into words
  let words = processedText.split(/\s+/);
  let wordsRemoved = 0;
  
  if (words.length <= 1) {
    return {text: processedText.substring(0, 160), changed: true};
  }
  
  // Define words that should NOT be removed (essential parts)
  const essentialWords = ['najik', 'huda', 'sewa', 'abharuddha', 'vayeko', 'cha', 
                         'sucharu', 'huna', 'aanumanit', 'lagne', 'jankari', 'garaudachau',
                         'kaam', 'thalani', 'aghi', 'hajur', 'lai', 'purna', 'hrs', 'h'];
  
  // Try removing words one by one from the end, skipping essential words
  let removalAttempts = 0;
  const maxAttempts = 20; // Prevent infinite loops
  
  while (processedText.length > 160 && removalAttempts < maxAttempts) {
    removalAttempts++;
    let wordRemoved = false;
    
    // Refresh words array
    words = processedText.split(/\s+/);
    
    // Start from the end and find a non-essential word to remove
    for (let i = words.length - 2; i >= 0; i--) {
      const currentWord = words[i].toLowerCase();
      
      // Skip if it's an essential word
      if (essentialWords.includes(currentWord)) {
        continue;
      }
      
      // Skip if it contains location (usually first few words) - keep location
      if (i < 2 && words.length > 5) {
        continue;
      }
      
      // Skip if it's the RFO description part
      if (currentWord.includes('fiber') || currentWord.includes('cable') || 
          currentWord.includes('gadi') || currentWord.includes('le') ||
          currentWord.includes('kaatiyeko') || currentWord.includes('chudaaleko')) {
        continue;
      }
      
      // Remove this word
      const newWords = [...words.slice(0, i), ...words.slice(i + 1)];
      const newText = newWords.join(' ');
      
      console.log(`Attempt ${removalAttempts}: Removing word "${currentWord}" at position ${i}`);
      console.log(`Length: ${processedText.length} -> ${newText.length}`);
      
      processedText = newText;
      wordsRemoved++;
      wordRemoved = true;
      
      // Check if we're done
      if (processedText.length <= 160) {
        console.log(`Success! Removed ${wordsRemoved} word(s), final length: ${processedText.length}`);
        return {text: processedText, changed: true};
      }
      
      // Break the for loop to recalculate words array
      break;
    }
    
    // If no word was removed in this iteration, try different strategies
    if (!wordRemoved) {
      // Try removing connecting words
      const connectingWords = ['ra', 'ani', 'tara', 'ta'];
      let connectorRemoved = false;
      
      for (const connector of connectingWords) {
        // Create regex to match the word with spaces around it
        const regex = new RegExp(`\\s${connector}\\s`, 'gi');
        if (processedText.match(regex)) {
          const before = processedText;
          processedText = processedText.replace(regex, ' ');
          console.log(`Removed connector '${connector}', length: ${before.length} -> ${processedText.length}`);
          wordsRemoved++;
          connectorRemoved = true;
          
          if (processedText.length <= 160) {
            return {text: processedText, changed: true};
          }
          break;
        }
      }
      
      if (!connectorRemoved) {
        // Try removing "ra" from "cha ra sewa" pattern
        const chaRaSewaRegex = /cha\s+ra\s+sewa/gi;
        if (processedText.match(chaRaSewaRegex)) {
          const before = processedText;
          processedText = processedText.replace(chaRaSewaRegex, 'cha sewa');
          console.log(`Removed 'ra' from 'cha ra sewa', length: ${before.length} -> ${processedText.length}`);
          wordsRemoved++;
          
          if (processedText.length <= 160) {
            return {text: processedText, changed: true};
          }
        } else {
          // If all else fails, try shortening ETR
          const etrRegex = /(\d+)\s+hrs/gi;
          if (processedText.match(etrRegex)) {
            const before = processedText;
            processedText = processedText.replace(etrRegex, '$1h');
            console.log(`Shortened ETR, length: ${before.length} -> ${processedText.length}`);
            
            if (processedText.length <= 160) {
              return {text: processedText, changed: true};
            }
          } else {
            // Break out of loop if no more changes possible
            break;
          }
        }
      }
    }
  }
  
  // Last resort: truncate to 160 characters at a word boundary
  if (processedText.length > 160) {
    const truncated = processedText.substring(0, 160);
    // Find last space to avoid cutting words
    const lastSpace = truncated.lastIndexOf(' ');
    if (lastSpace > 150) {
      console.log("Truncating at word boundary");
      return {text: truncated.substring(0, lastSpace), changed: true};
    }
    console.log("Truncating at character boundary");
    return {text: truncated, changed: true};
  }
  
  return {text: processedText, changed: wordsRemoved > 0};
}

// ======= State =======
let activeMode = 'outage';
let activeOutageSubMode = 'normal';
let activeRainMode = 'off';
const COMPANY = 'WorldLink'; 
const CONTACT = '9801523051';

// Split RFOs into normal and special cases
const normalRfoList = [
  "Fiber breakage", "Fiber pulled by Vehicle", "Electric Short Circuit", "Pole breakage", "Pole shifting by NEA",
  "Fiber Cut by NEA", "Pole shifting by NTC", "Fallen Tree", "Fiber Burn", "Fire on Pole", "Road expansion", "Pole removed by NEA",
  "Pole removed by NTC", "Fiber Cut by Municipality", "Landslide", "Flood", "Fiber Management by ward", "Fiber Management by Municipality", "Others"
];

const specialRfoList = [
  "Rato Machhindranath", "Seto Machhindranath", "Technical Issue"
];

// NEW: Storage key for saved templates
const STORAGE_KEY = 'template_saves';

// NEW: Storage key for notepad
const NOTEPAD_STORAGE_KEY = 'template_notepad';

// RFO Nepali mapping
const RFO_NEPALI_MAPPING = {
  "Fiber breakage": "fiber kaatiyeko",
  "Electric Short Circuit": "bijuli short circuit",
  "Pole breakage": "pole dhaleko",
  "Pole shifting by NEA": "NEA le pole sareko",
  "Fiber Cut by NEA": "NEA le fiber kateko",
  "Pole shifting by NTC": "NTC le pole sareko",
  "Fallen Tree": "rukh dhalera fiber katiyeko",
  "Fiber Burn": "fiber jaleko",
  "Fiber pulled by Vehicle": "gaadi le fiber cable chudaaleko",
  "Fire on Pole": "pole aaglagi",
  "Road expansion": "baato badhaune kaam vayiraheko",
  "Pole removed by NEA": "NEA le pole hatayeko",
  "Pole removed by NTC": "NTC le pole hatayeko",
  "Fiber Cut by Municipality": "Nagarpalika le fiber kateko",
  "Others": "samaasya ko karan",
  "Rato Machhindranath": "Rato Machindranath Jatra ko karan",
  "Seto Machhindranath": "Seto Machindranath Jatra ko karan",
  "Landslide": "pahiro gayeko",
  "Flood": "badi le garda",
  "Fiber Management by ward": "Ward dwara fiber kaatiyeko",
  "Fiber Management by Municipality": "Nagarpalika dwara fiber kaatiyeko"
};




// ======= NEW: Notepad Functions =======
    
    /**
     * Toggle notepad visibility
     */
    function toggleNotepad() {
      const notepad = $('#notepad');
      const isHidden = notepad.classList.contains('hidden');
      
      if (isHidden) {
        notepad.classList.remove('hidden');
        loadNotepadContent();
        updateNotepadCount();
      } else {
        notepad.classList.add('hidden');
      }
    }
    
    /**
     * Load saved notepad content from localStorage
     */
    function loadNotepadContent() {
      try {
        const savedContent = localStorage.getItem(NOTEPAD_STORAGE_KEY);
        if (savedContent) {
          $('#notepadTextarea').value = savedContent;
        }
      } catch (e) {
        console.error('Error loading notepad content:', e);
      }
    }
    
    /**
     * Save notepad content to localStorage
     */
    function saveNotepadContent() {
      try {
        const content = $('#notepadTextarea').value;
        localStorage.setItem(NOTEPAD_STORAGE_KEY, content);
      } catch (e) {
        console.error('Error saving notepad content:', e);
      }
    }
    
    /**
     * Count words in a text
     */
    function countWords(text) {
      if (!text || text.trim() === '') return 0;
      return text.trim().split(/\s+/).filter(word => word.length > 0).length;
    }
    
    /**
     * Update notepad character and word counts
     */
    function updateNotepadCount() {
      const textarea = $('#notepadTextarea');
      const text = textarea.value;
      
      // Update character count
      const charCount = text.length;
      $('#charCount').textContent = `${charCount}/500`;
      
      // Update total word count
      const totalWords = countWords(text);
      $('#totalWordsCount').textContent = totalWords;
      
      // Update badge if there's content
      const badge = $('#notepadBadge');
      if (charCount > 0) {
        badge.textContent = charCount;
        badge.classList.remove('hidden');
      } else {
        badge.classList.add('hidden');
      }
      
      // Save content automatically
      saveNotepadContent();
      
      // Also update selected count in case selection changed
      updateSelectedCount();
    }
    
    /**
     * Update selected text word count
     */
    function updateSelectedCount() {
      const textarea = $('#notepadTextarea');
      const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
      const selectedWords = countWords(selectedText);
      $('#selectedWordsCount').textContent = selectedWords;
    }
    
    /**
     * Clear notepad content
     */
    function clearNotepad() {
      if (confirm('Clear all text from notepad?')) {
        $('#notepadTextarea').value = '';
        updateNotepadCount();
      }
    }
    
    /**
     * Copy notepad content to clipboard
     */
    function copyNotepad() {
      const textarea = $('#notepadTextarea');
      const text = textarea.value;
      
      if (!text || text.trim() === '') {
        alert('Notepad is empty. Nothing to copy.');
        return;
      }
      
      // Select the text
      textarea.select();
      textarea.setSelectionRange(0, text.length);
      
      // Copy to clipboard
      try {
        const success = document.execCommand('copy');
        if (success) {
          // Show success feedback
          const copyBtn = document.querySelector('.notepad-btn.copy');
          const originalHtml = copyBtn.innerHTML;
          copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
          
          setTimeout(() => {
            copyBtn.innerHTML = originalHtml;
          }, 1500);
          
          // Deselect text
          textarea.setSelectionRange(0, 0);
        }
      } catch (err) {
        // Fallback for older browsers
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = text;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextArea);
        
        // Show success feedback
        const copyBtn = document.querySelector('.notepad-btn.copy');
        const originalHtml = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        
        setTimeout(() => {
          copyBtn.innerHTML = originalHtml;
        }, 1500);
      }
    }
    
    /**
     * Initialize notepad on load
     */
    function initNotepad() {
      loadNotepadContent();
      updateNotepadCount();
      
      // Add event listeners for selection changes
      const textarea = $('#notepadTextarea');
      textarea.addEventListener('mouseup', updateSelectedCount);
      textarea.addEventListener('keyup', updateSelectedCount);
      
      // Auto-save on blur
      textarea.addEventListener('blur', saveNotepadContent);
    }



    
// ======= UPDATED: Character Count with Nepali Word Removal =======
// ======= UPDATED: Character Count with Nepali Word Removal =======
function charCountWithSignature(text){
  // First fix spacing
  let processedText = fixNepaliSpacing(text);
  const originalLength = processedText.length;
  
  // Check if this is a Nepali outage template
  const isNepaliOutageTemplate = (processedText.includes('najik') || processedText.includes('huda')) && 
                                 (processedText.includes('sewa') || processedText.includes('abharuddha') || processedText.includes('abharudha'));
  
  let changed = false;
  
  if (isNepaliOutageTemplate && originalLength > 160) {
    // Apply word removal for outage templates
    const result = removeWordFromNepaliOutageTemplate(processedText);
    processedText = result.text;
    changed = result.changed;
    console.log("Word removal applied:", changed, "New length:", processedText.length);
  }
  
  // ===== MODIFIED: Remove "hamro" words one by one =====
  if (processedText.length + 7 > 160) {
    // Check if "hamro" exists in the text
    const hamroRegex = /\bhamro\s+/gi;
    let match;
    let removalCount = 0;
    
    // Keep removing one "hamro" at a time until under limit or no more "hamro"
    while (processedText.length + 7 > 160 && hamroRegex.test(processedText)) {
      // Reset regex lastIndex
      hamroRegex.lastIndex = 0;
      
      // Find the first occurrence
      match = hamroRegex.exec(processedText);
      if (match) {
        const before = processedText;
        // Remove just this one occurrence
        processedText = processedText.substring(0, match.index) + 
                       processedText.substring(match.index + match[0].length);
        removalCount++;
        console.log(`Removed "hamro" #${removalCount}, length: ${before.length} -> ${processedText.length}`);
        
        if (processedText.length + 7 <= 160) {
          console.log(`Reached target after removing ${removalCount} "hamro" word(s)`);
          break;
        }
      } else {
        break;
      }
    }
    
    if (removalCount > 0) {
      changed = true;
    }
  }

  const canFull = processedText.length + 11 < 160; // \n-WorldLink is 11 chars
  const sig = canFull ? `\n-${COMPANY}` : "\n-WLink";
  
  // Calculate final length including signature
  const finalLength = processedText.length + sig.length;
  const finalText = processedText + sig;
  
  console.log("Final text length with signature:", finalLength);
  console.log("Final text:", finalText);
  
  return { 
    length: finalLength, 
    sig: sig,
    text: processedText, // Return the processed text WITHOUT signature
    originalText: text,
    changed: changed
  };
}

// ======= Save/Load Functions =======

/**
 * Generate a unique 4-character code
 */
function generateFourDigitCode() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let code = '';

  // Generate 4 alphabet letters
  for (let i = 0; i < 4; i++) {
    code += letters.charAt(Math.floor(Math.random() * letters.length));
  }

  // Generate number from 01 to 15
  const num = Math.floor(Math.random() * 15) + 1;

  // If number is 01, return letters only
  if (num === 1) {
    return code;
  }

  // Otherwise append the number
  return code + String(num).padStart(2, '0');
}

/**
 * Get all saved templates from localStorage
 */
function getSavedTemplates() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.error('Error loading saved templates:', e);
    return [];
  }
}

/**
 * Save templates to localStorage
 */
function saveTemplates(templates) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
  } catch (e) {
    console.error('Error saving templates:', e);
  }
}

/**
 * Save the current template state
 */
function saveCurrentTemplate(code) {
  // Get current form values
  let rfoValue = '';
  let locationValue = '';
  let etrValue = '';
  let specialRfoValue = '';
  let specialLocationValue = '';
  
  if (activeMode === 'outage') {
    if (activeOutageSubMode === 'normal') {
      rfoValue = $('#rfo')?.value || '';
      locationValue = $('#locationNormal')?.value || '';
      etrValue = $('#etr')?.value || '';
    } else if (activeOutageSubMode === 'special') {
      specialRfoValue = $('#specialRfo')?.value || '';
      specialLocationValue = $('#locationSpecial')?.value || '';
    }
  }
  
  // Get maintenance values
  let mDateEnValue = $('#mDateEn')?.value || '';
  let mNpDayValue = $('#mNpDay')?.value || '';
  let mStartHValue = $('#mStartH')?.value || '';
  let mStartMValue = $('#mStartM')?.value || '';
  let mStartAPValue = $('#mStartAP')?.value || '';
  let mEndHValue = $('#mEndH')?.value || '';
  let mEndMValue = $('#mEndM')?.value || '';
  let mEndAPValue = $('#mEndAP')?.value || '';
  
  const currentState = {
    // Form values
    mode: activeMode,
    outageSubMode: activeOutageSubMode,
    rainMode: activeRainMode,
    rfo: rfoValue,
    specialRfo: specialRfoValue,
    locationNormal: locationValue,
    locationSpecial: specialLocationValue,
    etr: etrValue,
    // For maintenance mode
    mDateEn: mDateEnValue,
    mNpDay: mNpDayValue,
    mStartH: mStartHValue,
    mStartM: mStartMValue,
    mStartAP: mStartAPValue,
    mEndH: mEndHValue,
    mEndM: mEndMValue,
    mEndAP: mEndAPValue,
    // Generated content
    generatedContent: getCurrentGeneratedContent(),
    timestamp: Date.now(),
    code: code.toUpperCase(),
    expiresAt: Date.now() + (8 * 60 * 60 * 1000) // 8 hours from now
  };
  
  const savedTemplates = getSavedTemplates();
  
  // Check if code already exists
  const existingIndex = savedTemplates.findIndex(t => t.code === code.toUpperCase());
  if (existingIndex !== -1) {
    // Replace existing template with same code
    savedTemplates[existingIndex] = currentState;
  } else {
    // Add as new template
    savedTemplates.push(currentState);
  }
  
  saveTemplates(savedTemplates);
  
  return currentState;
}

/**
 * Get current generated content
 */
function getCurrentGeneratedContent() {
  const sections = $$('#outBodies .out-section');
  const content = [];
  
  sections.forEach(section => {
    const title = section.querySelector('h3')?.textContent || '';
    const text = section.querySelector('.text')?.textContent || '';
    if (title && text) {
      content.push({ title, text });
    }
  });
  
  return content;
}

/**
 * Load a saved template
 */
function loadTemplate(template) {
  // First set the mode
  setMode(template.mode);
  
  // Give time for forms to render, then set values
  setTimeout(() => {
    // Set the mode-specific values
    if (template.mode === 'outage') {
      // Set the sub-mode first
      if (template.outageSubMode) {
        setOutageSubMode(template.outageSubMode);
      }
      
      // Give a bit more time for the forms to update
      setTimeout(() => {
        if (template.outageSubMode === 'normal') {
          if (template.rfo && $('#rfo')) $('#rfo').value = template.rfo;
          if (template.locationNormal && $('#locationNormal')) $('#locationNormal').value = template.locationNormal;
          if (template.etr && $('#etr')) $('#etr').value = template.etr;
          if (template.rainMode) setRainMode(template.rainMode);
        } else if (template.outageSubMode === 'special') {
          if (template.specialRfo && $('#specialRfo')) $('#specialRfo').value = template.specialRfo;
          if (template.locationSpecial && $('#locationSpecial')) $('#locationSpecial').value = template.locationSpecial;
        }
        
        // Generate the output
        generate();
      }, 100);
    } else {
      // Maintenance mode - set values directly
      if (template.mDateEn && $('#mDateEn')) $('#mDateEn').value = template.mDateEn;
      if (template.mNpDay && $('#mNpDay')) $('#mNpDay').value = template.mNpDay;
      if (template.mStartH && $('#mStartH')) $('#mStartH').value = template.mStartH;
      if (template.mStartM && $('#mStartM')) $('#mStartM').value = template.mStartM;
      if (template.mStartAP && $('#mStartAP')) $('#mStartAP').value = template.mStartAP;
      if (template.mEndH && $('#mEndH')) $('#mEndH').value = template.mEndH;
      if (template.mEndM && $('#mEndM')) $('#mEndM').value = template.mEndM;
      if (template.mEndAP && $('#mEndAP')) $('#mEndAP').value = template.mEndAP;
      
      // Generate the output
      generate();
    }
    
    closeLoadModal();
  }, 150);
}

/**
 * Clear all saved templates
 */
function clearAllSavedTemplates() {
  if (confirm('Are you sure you want to clear ALL saved templates?')) {
    localStorage.removeItem(STORAGE_KEY);
    loadSavedTemplatesList();
    alert('All saved templates have been cleared.');
  }
}

/**
 * Format time for display
 */
function formatTime(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

/**
 * Format date for display
 */
function formatDate(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

/**
 * Get time remaining until expiration
 */
function getTimeRemaining(expiresAt) {
  const now = Date.now();
  const remaining = expiresAt - now;
  
  if (remaining <= 0) return 'Expired';
  
  const hours = Math.floor(remaining / (1000 * 60 * 60));
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours > 0) {
    return `${hours}h ${minutes}m remaining`;
  } else {
    return `${minutes}m remaining`;
  }
}

/**
 * Open save modal
 */
function openSaveModal() {
  const modal = $('#saveModal');
  const input = $('#saveCodeInput');
  
  // Generate a suggested code
  input.value = generateFourDigitCode();
  modal.classList.remove('hidden');
  input.focus();
  input.select();
  
  // Add enter key support
  input.onkeydown = function(e) {
    if (e.key === 'Enter') {
      saveTemplate();
    }
  };
}

/**
 * Close save modal
 */
function closeSaveModal() {
  $('#saveModal').classList.add('hidden');
  const input = $('#saveCodeInput');
  input.value = '';
  input.onkeydown = null;
}

/**
 * Open load modal
 */
function openLoadModal() {
  const modal = $('#loadModal');
  modal.classList.remove('hidden');
  loadSavedTemplatesList();
}

/**
 * Close load modal
 */
function closeLoadModal() {
  $('#loadModal').classList.add('hidden');
}

/**
 * Load and display saved templates list
 */
function loadSavedTemplatesList() {
  const container = $('#savedItemsList');
  const savedTemplates = getSavedTemplates();
  const now = Date.now();
  
  // Clear expired templates on load
  const validTemplates = savedTemplates.filter(template => template.expiresAt > now);
  if (validTemplates.length < savedTemplates.length) {
    saveTemplates(validTemplates);
  }
  
  if (validTemplates.length === 0) {
    container.innerHTML = '<div class="no-saved-items">No saved templates found</div>';
    return;
  }
  
  // Sort by most recent first
  validTemplates.sort((a, b) => b.timestamp - a.timestamp);
  
  let html = '';
  
  validTemplates.forEach((template, index) => {
    const timeRemaining = getTimeRemaining(template.expiresAt);
    const modeText = template.mode === 'outage' ? 'Outage' : 'Maintenance';
    
    // Get a preview of the content
    let contentPreview = '';
    if (template.generatedContent && template.generatedContent.length > 0) {
      const firstContent = template.generatedContent[0].text || '';
      contentPreview = firstContent.substring(0, 60) + (firstContent.length > 60 ? '...' : '');
    } else if (template.rfo || template.specialRfo) {
      const rfo = template.rfo || template.specialRfo || '';
      const location = template.locationNormal || template.locationSpecial || '';
      contentPreview = rfo + (location ? ' - ' + location : '');
    }
    
    html += `
      <div class="saved-item" onclick="loadTemplateByCode('${template.code}')">
        <div class="saved-item-header">
          <div class="saved-item-code">${template.code}</div>
          <div class="saved-item-time">${formatDate(template.timestamp)} ${formatTime(template.timestamp)}</div>
        </div>
        <div class="saved-item-content" title="${contentPreview}">
          ${modeText} - ${contentPreview}
        </div>
        <div class="saved-item-meta">
          <span style="color: var(--ok);">${timeRemaining}</span>
        </div>
      </div>
    `;
  });
  
  container.innerHTML = html;
}

/**
 * Load template by code
 */
function loadTemplateByCode(code) {
  const savedTemplates = getSavedTemplates();
  const template = savedTemplates.find(t => t.code === code);
  
  if (template) {
    const now = Date.now();
    
    if (template.expiresAt <= now) {
      alert('This template has expired and cannot be loaded.');
      loadSavedTemplatesList(); // Refresh the list
      return;
    }
    
    loadTemplate(template);
  } else {
    alert('Template not found. It may have expired or been deleted.');
    loadSavedTemplatesList(); // Refresh the list
  }
}

/**
 * Save template with code
 */
function saveTemplate() {
  const input = $('#saveCodeInput');
  let code = input.value.trim().toUpperCase();
  
  if (!code || code.length !== 4) {
    alert('Please enter a 4-digit code (letters or numbers)');
    input.focus();
    return;
  }
  
  // Validate code is alphanumeric
  if (!/^[A-Z0-9]{4}$/.test(code)) {
    alert('Code must contain only letters and numbers (A-Z, 0-9)');
    input.focus();
    return;
  }
  
  // Check if we have any content to save
  const content = getCurrentGeneratedContent();
  if (content.length === 0) {
    alert('Please generate a template first before saving.');
    return;
  }
  
  // Save the template
  const savedTemplate = saveCurrentTemplate(code);
  
  // Show success message
  alert(`Template saved with code: ${code}\n\nExpires in 8 hours`);
  
  // Close modal
  closeSaveModal();
}

// ======= Original Utilities =======
const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);
const el = (tag, props = {}, children = []) => {
  const n = document.createElement(tag);
  Object.entries(props).forEach(([k,v]) => {
    if (k === 'class') n.className = v; else if (k === 'text') n.textContent = v; else if (k.startsWith('on')) n.addEventListener(k.slice(2), v); else if (k === 'html') n.innerHTML = v; else n.setAttribute(k,v);
  });
  
  const childrenArr = Array.isArray(children) ? children : [children];
  childrenArr.forEach(child => {
    if (child === null || child === undefined) return;
    if (typeof child === 'string' || typeof child === 'number') {
      n.appendChild(document.createTextNode(child));
    } else {
      n.appendChild(child);
    }
  });
  
  return n;
};

function copy(id) {
  const textToCopy = $(id).innerText;
  const tempTextArea = document.createElement('textarea');
  tempTextArea.value = textToCopy;
  tempTextArea.style.position = 'fixed';
  tempTextArea.style.left = '-9999px';
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  
  try {
    const success = document.execCommand('copy');
    if (success) {
      const btn = document.querySelector(`[data-copy='${id}']`);
      if (btn) {
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => {
          btn.textContent = originalText;
        }, 1200);
      }
    } else {
      console.error('Copy command was unsuccessful.');
    }
  } catch (err) {
    console.error('Failed to copy text:', err);
  } finally {
    document.body.removeChild(tempTextArea);
  }
}

function two(n){ return String(n).padStart(2,'0'); }

function validateTwoDigit(input){
  input.value = input.value.replace(/\D/g,'').slice(0,2);
}

function toTitleCase(str) {
  return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function handleLocationInput(event) {
    generate();
}

function trimToWords(str, count) {
  if (!str) return '';
  const words = str.split(/\s+/).filter(w => w.length > 0);
  return words.slice(0, count).join(' ');
}

function maintenanceHeader(dateStr, from, to){
  return `Maintenance Work [${dateStr} from ${from} to ${to}]`;
}

function getCompletionEntity(rfo) {
    if (rfo.includes('NEA')) return 'NEA';
    if (rfo.includes('NTC')) return 'NTC';
    if (rfo.includes('Road expansion')) return 'NEA';
    if (rfo.includes('Machhindranath')) return 'After Jatra completion';
    if (rfo.includes('Pole')) return 'NEA';
    if (rfo.includes('Landslide')) return 'NEA';
    if (rfo.includes('Flood')) return 'NEA';
    if (rfo.includes('Circuit')) return 'NEA';
    if (rfo.includes('ward')) return 'Ward';
    if (rfo.includes('Burn')) return 'NEA';
    if (rfo.includes('Municipality')) return 'Municipality';
    return 'Authority';
}

// ======= Forms =======
function buildOutageForm() {
  const formContainer = $('#forms');
  formContainer.innerHTML = '';
  
  const subModeControl = el('div', { class: 'segmented-control', role: 'tablist' }, [
    el('button', { id: 'modeOutageNormal', class: 'active', onclick: () => setOutageSubMode('normal') }, 'Normal Outage'),
    el('button', { id: 'modeOutageSpecial', onclick: () => setOutageSubMode('special') }, 'Special Cases'),
    el('button', { id: 'modeAck2', onclick: () => setOutageSubMode('ack2') }, 'ACK2')
  ]);
  
  formContainer.appendChild(subModeControl);

  const outageForms = el('div', { id: 'outageForms' });
  
  // Normal Outage Form
  const normalForm = el('div', { id: 'outageNormalForm', class: 'grid' });
  const rfoSel = el('select', { class: 'input', id: 'rfo', onchange: generate });
  rfoSel.appendChild(el('option', { value: '', text: 'Select RFO' }));
  normalRfoList.forEach(k => rfoSel.appendChild(el('option', { value: k, text: k })));

  const etr = el('select', { class: 'input', id: 'etr', onchange: generate });
  etr.appendChild(el('option', { value: '', text: 'ETR (No ETR)' }));
  ['1 hour', '2 hours', '3 hours', '4 hours', '5 hours'].forEach(h => etr.appendChild(el('option', { value: h.replace(' hours', ' hrs').replace(' hour', ' hr'), text: h })));
  
  const rainModeControl = el('div', { class: 'segmented-control', id: 'rainModeControl' }, [
    el('button', { id: 'rainOff', onclick: () => setRainMode('off') }, 'Off'),
    el('button', { id: 'rainMid', onclick: () => setRainMode('mid') }, 'Mid Rain'),
    el('button', { id: 'rainOn', onclick: () => setRainMode('on') }, 'Full Rain'),
  ]);
  
  normalForm.append(
    field('Location (Max 15 words in output)', el('input', { class: 'input', id: 'locationNormal', placeholder: 'Enter Location', oninput: handleLocationInput })),
    el('div', { class:'grid two', id: 'rfoEtcContainer' }, [
      field('RFO', rfoSel),
      field('ETR', etr)
    ]),
    el('div', { class: 'field' }, [
      el('label', { text: 'Rain mode'}),
      rainModeControl
    ])
  );
  
  outageForms.appendChild(normalForm);

  // Special Case Form
  const specialForm = el('div', { id: 'outageSpecialForm', class: 'grid hidden' });
  const specialRfoSel = el('select', { class: 'input', id: 'specialRfo', onchange: generate });
  specialRfoSel.appendChild(el('option', { value: '', text: 'Select Special RFO' }));
  specialRfoList.forEach(k => specialRfoSel.appendChild(el('option', { value: k, text: k })));
  
  specialForm.append(
    field('Location (Max 15 words in output)', el('input', { class: 'input', id: 'locationSpecial', placeholder: 'Enter Location', oninput: handleLocationInput })),
    field('Special RFO', specialRfoSel)
  );
  
  outageForms.appendChild(specialForm);
  formContainer.appendChild(outageForms);
  
  setOutageSubMode('normal');
}

function buildMaintenanceForm(){
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];
  const defaultNpDay = tomorrow.getDate() - 17;

  const dateEn = el('input', { class: 'input', id: 'mDateEn', type: 'date', onchange: generate, value: tomorrowStr });
  const npDaySel = el('select', { class: 'input', id: 'mNpDay', onchange: generate });
  
  for(let i=1; i<=32; i++){
    const isDefault = i === defaultNpDay;
    npDaySel.appendChild(el('option', { value: i, text: i, selected: isDefault}));
  }

  const start = timePicker('mStart');
  const end = timePicker('mEnd');

  $('#forms').innerHTML = '';
  $('#forms').append(
    el('div', { class:'grid' }, [ 
      el('div', { class:'grid two' }, [ 
        field('English Date', dateEn), 
        field('Nepali Date (Day)', npDaySel)
      ]),
      el('div', { class:'grid two' }, [ 
        field('Start Time', start.wrap), 
        field('End Time', end.wrap) 
      ])
    ])
  );
}

function field(labelText, control){
  const wrapper = el('div', { class: 'field' });
  wrapper.appendChild(el('label', { text: labelText }));
  wrapper.appendChild(control);
  return wrapper;
}

function timePicker(id){
  const hh = el('select', { class:'input', id: id+'H', onchange: generate }, Array.from({length:12}, (_,i)=> el('option', { value: two(i+1), text: two(i+1) })));
  const mm = el('select', { class: 'input', id: id+'M', onchange: generate }, ['00','15','30','45'].map(m=> el('option', { value: m, text: m })) );
  const ap = el('select', { class: 'input', id: id+'AP', onchange: generate }, ['AM','PM'].map(x=> el('option', { value: x, text: x })) );
  const wrap = el('div', { class:'time-group' }, [hh, mm, ap]);
  return { hh, mm, ap, wrap };
}

// ======= Outputs =======
function setOutputs(configs){
  const bodies = $('#outBodies');
  bodies.innerHTML = '';
  configs.forEach((config, i) => {
    const isNepali = config.title === 'Nepali';
    const isHeader = config.title === 'Header';
    const outSection = el('div', { class: 'out-section' }, [
      el('div', { class: `out-header ${isNepali ? 'np' : isHeader ? 'centered' : ''}` }, [
        el('h3', { text: config.title }),
        isNepali && config.charCount ? el('div', { class: `count${config.charCount.length > 160 ? ' warn' : ''}`, text: `Characters: ${config.charCount.length}/160` }) : null,
        el('button', { class: 'copy-btn', ['data-copy']: `#text${i}`, onclick: () => copy(`#text${i}`) }, 'Copy')
      ]),
      el('pre', { class: 'text', id: `text${i}`, text: config.text }),
    ]);
    bodies.appendChild(outSection);
  });
}

// ======= Generator =======
function fmtTime(prefix){
  const H = $('#'+prefix+'H')?.value;
  const M = $('#'+prefix+'M')?.value;
  const AP = $('#'+prefix+'AP')?.value;
  return H && M ? `${H}:${M} ${AP}` : '';
}

function fmtEngDate(id){
  const raw = $(id)?.value; if(!raw) return '';
  const dt = new Date(raw);
  const day = dt.getDate();
  const month = dt.toLocaleString('default', { month: 'short' });
  const suffix = (d=> d%10===1 && d!==11 ? 'st' : d%10===2 && d!==12 ? 'nd' : d%10===3 && d!==13 ? 'rd' : 'th')(day);
  return `${day}${suffix} ${month}`;
}

function generateOutage() {
  if (activeOutageSubMode === 'ack2') {
    const T = OUTAGE_TEMPLATES['ACK2'];
    const nepaliText = T.np;
    const cc = charCountWithSignature(nepaliText);
    const englishText = T.en;
    
    $('#previewLabel').textContent = 'Outage (ACK2)';
    setOutputs([
      { title: 'Header', text: T.header },
      { title: 'Nepali', text: nepaliText + cc.sig, charCount: cc },
      { title: 'English', text: englishText }
    ]);
    return;
  }
  
  const selectedRfo = $('#rfo')?.value || '';
  const rawLoc = $('#locationNormal')?.value?.trim() || '';
  const trimmedLoc = trimToWords(toTitleCase(rawLoc), 15);
  
  if (activeRainMode !== 'off') {
    if (activeRainMode === 'mid') {
        if (!selectedRfo || !trimmedLoc) {
            setOutputs([{ title: 'Please select RFO and enter a location to generate rain mode messages.', text: 'No message generated.' }]);
            return;
        }
        const headerText = `${selectedRfo} near ${trimmedLoc} ETR: Unknown (Due to rainfall)`;
        const rfoNp = RFO_NEPALI_MAPPING[selectedRfo] || toTitleCase(selectedRfo);
      
        let npText = RAIN_MID_TEMPLATE.np
          .replace('{location}', trimmedLoc)
          .replace('{rfo_np}', rfoNp);
          
        const enText = RAIN_MID_TEMPLATE.en
          .replace('{location}', trimmedLoc)
          .replace('{rfo_en}', selectedRfo);
        
        const npCharCount = charCountWithSignature(npText);
        $('#previewLabel').textContent = 'Outage (Rain)';

        setOutputs([
          { title: 'Header', text: headerText },
          { title: 'Nepali', text: npCharCount.text + npCharCount.sig, charCount: npCharCount },
          { title: 'English', text: enText }
        ]);
    } else if (activeRainMode === 'on') {
      const headerRfo = selectedRfo || 'Fiber breakage';
      const headerLocation = trimmedLoc ? ` near ${trimmedLoc}` : '';
      
      const headerText = `${headerRfo}${headerLocation} ETR: Unknown (Due to Continuous Rainfall)`.trim();
      
      const npText = RAIN_TEMPLATE.np;
      const enText = RAIN_TEMPLATE.en;
      
      const npCharCount = charCountWithSignature(npText);
      $('#previewLabel').textContent = 'Outage (On Rain)';

      setOutputs([
        { title: 'Header', text: headerText },
        { title: 'Nepali', text: npCharCount.text + npCharCount.sig, charCount: npCharCount },
        { title: 'English', text: enText }
      ]);
    }
    return;
  }
  
  if (activeOutageSubMode === 'normal') {
    const etr = $('#etr')?.value || '';
    
    if (!selectedRfo || !trimmedLoc) {
      setOutputs([{ title: 'Please select RFO and location', text: 'Please enter a location and select RFO to generate templates.' }]);
      return;
    }
    
    const T = OUTAGE_TEMPLATES[selectedRfo] || OUTAGE_TEMPLATES['Others'];
    const isNormalWithEtr = T.hasOwnProperty('np_with');
    const hasEtr = etr !== '' && isNormalWithEtr;

    if (hasEtr) {
      let nepaliText = T.np_with.replace('{{LOCATION}}', trimmedLoc).replace('[ETR]', etr);
      
      const cc = charCountWithSignature(nepaliText);
      
      setOutputs([
        { title: 'Nepali', text: cc.text + cc.sig, charCount: cc }
      ]);
    } else {
      let nepaliText = T.np_without.replace('{{LOCATION}}', trimmedLoc);
      
      const cc = charCountWithSignature(nepaliText);
      const englishText = `Dear Valued Customer,\n\n${T.en_without.replace('{{LOCATION}}', trimmedLoc)}\n\nSincerely,\nCustomer Service Department\nContact no: ${CONTACT}\n${COMPANY}`;
      const entity = getCompletionEntity(selectedRfo);
      
      let headerText = `${selectedRfo} near ${trimmedLoc} ETR: Unknown (After ${entity} task completion)`;
      $('#previewLabel').textContent = `Outage (${selectedRfo})`;

      setOutputs([
        { title: 'Header', text: headerText },
        { title: 'Nepali', text: cc.text + cc.sig, charCount: cc },
        { title: 'English', text: englishText }
      ]);
    }

  } else {
    const selectedRfo = $('#specialRfo')?.value || '';
    const rawLoc = $('#locationSpecial')?.value?.trim() || '';
    const trimmedLoc = trimToWords(toTitleCase(rawLoc), 15);
    
    if (!selectedRfo) {
      setOutputs([{ title: 'Please select a special case', text: 'Please select a special case to generate templates.' }]);
      return;
    }

    const T = OUTAGE_TEMPLATES[selectedRfo];
    
    let nepaliText = T.np_without.replace('{{LOCATION}} najik', '');
    
    const cc = charCountWithSignature(nepaliText);
    
    const englishText = `Dear Valued Customer,\n\n${T.en_without.replace(' near {{LOCATION}}', '')}\n\nSincerely,\nCustomer Service Department\nContact no: ${CONTACT}\n${COMPANY}`;
    
    let headerText = `${selectedRfo}`;
    if (trimmedLoc) {
        headerText += ` near ${trimmedLoc}`;
    }
    if (T.tag) {
        headerText += ` ${T.tag}`;
    }

    $('#previewLabel').textContent = `Outage (${selectedRfo})`;

    setOutputs([
      { title: 'Header', text: headerText },
      { title: 'Nepali', text: cc.text + cc.sig, charCount: cc },
      { title: 'English', text: englishText }
    ]);
  }
}

function generateMaintenance() {
  const d = fmtEngDate('#mDateEn');
  const start = fmtTime('mStart');
  const end = fmtTime('mEnd');
  const header = maintenanceHeader(d || '[Date]', start, end);
  const mNpD = $('#mNpDay')?.value || '';
  const nepDay = mNpD ? `${parseInt(mNpD,10)} Gate` : '1 Gate';

  $('#previewLabel').textContent = 'Maintenance';
  
  let np = MAINT_TEMPLATE.np.replace('[nepali_date]', nepDay).replace('[start_time]', start).replace('[end_time]', end);
  const en = MAINT_TEMPLATE.en.replace('[english_date]', d || '[date]').replace('[start_time]', start).replace('[end_time]', end);
  const npCharCount = charCountWithSignature(np);

  setOutputs([
    { title: 'Header', text: header },
    { title: 'Nepali', text: npCharCount.text + npCharCount.sig, charCount: npCharCount },
    { title: 'English', text: en }
  ]);
}

function generate() {
  const rfoEtcContainer = $('#rfoEtcContainer');
  const etrField = $('#etr')?.parentNode;
  if (rfoEtcContainer && etrField) {
    if (activeRainMode === 'off' && activeOutageSubMode === 'normal') {
        etrField.classList.remove('hidden');
        rfoEtcContainer.classList.add('two');
    } else {
        etrField.classList.add('hidden');
        rfoEtcContainer.classList.remove('two');
    }
  }

  if (activeMode === 'outage') {
    generateOutage();
  } else {
    generateMaintenance();
  }
}

function clearNormalOutageFields() {
  const locationInput = $('#locationNormal');
  const rfoSelect = $('#rfo');
  const etrSelect = $('#etr');
  
  if (locationInput) locationInput.value = '';
  if (rfoSelect) rfoSelect.value = '';
  if (etrSelect) etrSelect.value = '';
  
  activeRainMode = 'off';
}

function updateOutageFormVisibility() {
  const normalForm = $('#outageNormalForm');
  const specialForm = $('#outageSpecialForm');
  
  if (activeOutageSubMode === 'normal') {
    normalForm.classList.remove('hidden');
    specialForm.classList.add('hidden');
  } else if (activeOutageSubMode === 'special') {
    normalForm.classList.add('hidden');
    specialForm.classList.remove('hidden');
  } else if (activeOutageSubMode === 'ack2') {
    normalForm.classList.add('hidden');
    specialForm.classList.add('hidden');
  }
  
  const rainModeControl = $('#rainModeControl');
  if (rainModeControl) {
    const rainModeButtons = rainModeControl.querySelectorAll('button');
    rainModeButtons.forEach(btn => btn.classList.remove('active'));
    const activeBtn = $(`#rain${activeRainMode.charAt(0).toUpperCase() + activeRainMode.slice(1)}`);
    if (activeBtn) {
      activeBtn.classList.add('active');
    }
  }
  
  const outageSubModeControl = $('#forms').querySelector('.segmented-control');
  if (outageSubModeControl) {
    const outageSubModeButtons = outageSubModeControl.querySelectorAll('button');
    outageSubModeButtons.forEach(btn => btn.classList.remove('active'));
    if (activeOutageSubMode === 'normal') {
      $('#modeOutageNormal').classList.add('active');
    } else if (activeOutageSubMode === 'special') {
      $('#modeOutageSpecial').classList.add('active');
    } else if (activeOutageSubMode === 'ack2') {
      $('#modeAck2').classList.add('active');
    }
  }

  generate();
}

function setRainMode(mode) {
  activeRainMode = mode;
  updateOutageFormVisibility();
}

function setOutageSubMode(mode) {
  if (activeOutageSubMode !== mode) {
    if (mode === 'special' || mode === 'ack2') {
      clearNormalOutageFields();
    }
    activeOutageSubMode = mode;
    updateOutageFormVisibility();
  }
}

// ======= Mode =======
function setMode(mode){
  activeMode = mode;
  $('#modeOutage').classList.toggle('active', mode==='outage');
  $('#modeMaintenance').classList.toggle('active', mode==='maintenance');

  const calendarCard = $('#nepaliCalendarCard');
  
  if (mode === 'outage') {
    buildOutageForm();
    if (calendarCard) {
      calendarCard.classList.add('hidden');
    }
  } else {
    buildMaintenanceForm();
    if (calendarCard) {
      calendarCard.classList.remove('hidden');
    }
  }
  
  generate();
  window.location.hash = mode;
}

// ======= Misc =======
function clearAll(){
  document.querySelectorAll('input, select, textarea').forEach(i=>{
    if (i.type==='checkbox') i.checked = false; else i.value = '';
  });
  generate();
  setDefaults();
}

function fromHash(){
  const h = (location.hash||'').replace('#','');
  if (h==='outage' || h==='maintenance') setMode(h); else setMode('outage');
}

function setDefaults() {
  $$('select[id$="H"]').forEach(el => el.value = '03');
  $$('select[id$="M"]').forEach(el => el.value = '00');
  $$('select[id$="AP"]').forEach(el => el.value = 'AM');
}

window.onload = function() {
  fromHash();
  setDefaults();
  generate();
};

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'F12' || e.code === 'F12') {
    e.preventDefault();
  }
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.code === 'KeyI')) {
    e.preventDefault();
  }
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'J' || e.code === 'KeyJ')) {
    e.preventDefault();
  }
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'C' || e.code === 'KeyC')) {
    e.preventDefault();
  }
  if ((e.ctrlKey || e.metaKey) && (e.key === 'U' || e.code === 'KeyU')) {
    e.preventDefault();
  }
});

function handleLogout() {
    console.log("Logout clicked"); // DEBUG
    window.location.href = "/login"; 
}




// ======= DUPLICATE NOTEPAD USING ONLY JAVASCRIPT =======

/**
 * Create a second notepad on the left side programmatically
 */
function createLeftNotepad() {
    // Check if left notepad already exists
    if (document.getElementById('notepadLeft')) {
        return; // Already created
    }
    
    // Get the original notepad container
    const originalContainer = document.querySelector('.notepad-container');
    if (!originalContainer) return;
    
    // Clone the entire notepad container
    const leftContainer = originalContainer.cloneNode(true);
    
    // Modify the cloned container
    leftContainer.className = 'notepad-container left-notepad';
    
    // Update IDs and attributes for left notepad
    const leftNotepad = leftContainer.querySelector('.notepad');
    leftNotepad.id = 'notepadLeft';
    
    // Update header title
    const headerTitle = leftNotepad.querySelector('.notepad-header h3');
    if (headerTitle) {
        headerTitle.textContent = 'Quick Notepad - Left';
    }
    
    // Update textarea
    const textarea = leftNotepad.querySelector('.notepad-textarea');
    textarea.id = 'notepadTextareaLeft';
    textarea.oninput = function() { updateNotepadCountDual('left'); };
    textarea.onselect = function() { updateSelectedCountDual('left'); };
    
    // Update counter displays
    const counterItems = leftNotepad.querySelectorAll('.counter-item');
    if (counterItems.length >= 3) {
        // Total characters
        const totalSpan = counterItems[0].querySelector('.counter-value');
        totalSpan.id = 'totalCharsLeft';
        totalSpan.textContent = '0';
        
        // Selected characters
        const selectedSpan = counterItems[1].querySelector('.counter-value');
        selectedSpan.id = 'selectedCharsLeft';
        selectedSpan.textContent = '0';
        
        // Character count
        const charSpan = counterItems[2].querySelector('.counter-value');
        charSpan.id = 'charCountLeft';
        charSpan.textContent = '0/500';
    }
    
    // Update toggle button
    const toggleBtn = leftContainer.querySelector('.notepad-toggle');
    toggleBtn.id = 'notepadToggleLeft';
    toggleBtn.onclick = function() { toggleNotepadDual('left'); };
    
    // Update badge
    const badge = leftContainer.querySelector('.badge');
    badge.id = 'notepadBadgeLeft';
    
    // Update copy button
    const copyBtn = leftNotepad.querySelector('.notepad-btn.copy');
    if (copyBtn) {
        copyBtn.onclick = function() { copyNotepadDual('left'); };
    }
    
    // Update clear button
    const clearBtn = leftNotepad.querySelector('.notepad-btn.clear');
    if (clearBtn) {
        clearBtn.onclick = function() { clearNotepadDual('left'); };
    }
    
    // Update close button
    const closeBtn = leftNotepad.querySelector('.notepad-close');
    if (closeBtn) {
        closeBtn.onclick = function() { toggleNotepadDual('left'); };
    }
    
    // Remove any existing left notepad
    const existingLeft = document.querySelector('.left-notepad');
    if (existingLeft) {
        existingLeft.remove();
    }
    
    // Add to document
    document.body.appendChild(leftContainer);
    
    // Add CSS for left positioning if not exists
    addLeftNotepadStyles();
    
    console.log('✅ Left notepad created successfully');
}

/**
 * Add CSS styles for left notepad positioning
 */
function addLeftNotepadStyles() {
    // Check if styles already exist
    if (document.getElementById('leftNotepadStyles')) {
        return;
    }
    
    const style = document.createElement('style');
    style.id = 'leftNotepadStyles';
    style.textContent = `
        .notepad-container.left-notepad {
            position: fixed;
            bottom: 20px;
            left: 20px;
            z-index: 1000;
        }
        
        .notepad-container.left-notepad .notepad {
            position: absolute;
            bottom: 60px;
            left: 0;
            width: 320px;
            background: var(--bg, #ffffff);
            border: 1px solid var(--border, #e2e8f0);
            border-radius: var(--radius, 8px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            overflow: hidden;
        }
        
        .notepad-container.right-notepad {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
        }
        
        .notepad-container.right-notepad .notepad {
            position: absolute;
            bottom: 60px;
            right: 0;
            width: 320px;
            background: var(--bg, #ffffff);
            border: 1px solid var(--border, #e2e8f0);
            border-radius: var(--radius, 8px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            overflow: hidden;
        }
        
        .notepad-container.left-notepad .notepad-toggle,
        .notepad-container.right-notepad .notepad-toggle {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: var(--primary, #3b82f6);
            color: white;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            position: relative;
        }
        
        .badge {
            position: absolute;
            top: -5px;
            right: -5px;
            background: #ef4444;
            color: white;
            font-size: 10px;
            font-weight: 600;
            min-width: 18px;
            height: 18px;
            border-radius: 9px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 4px;
        }
        
        .hidden {
            display: none !important;
        }
    `;
    
    document.head.appendChild(style);
}

// ======= DUAL NOTEPAD FUNCTIONS =======

// Storage keys
const NOTEPAD_RIGHT_KEY = 'template_notepad_right';
const NOTEPAD_LEFT_KEY = 'template_notepad_left';

/**
 * Toggle notepad visibility
 */
function toggleNotepadDual(side = 'right') {
    const notepadId = side === 'right' ? 'notepad' : 'notepadLeft';
    const notepad = document.getElementById(notepadId);
    if (!notepad) return;
    
    const isHidden = notepad.classList.contains('hidden');
    
    if (isHidden) {
        notepad.classList.remove('hidden');
        loadNotepadContentDual(side);
        updateNotepadCountDual(side);
    } else {
        notepad.classList.add('hidden');
    }
}

/**
 * Load notepad content
 */
function loadNotepadContentDual(side = 'right') {
    try {
        const storageKey = side === 'right' ? NOTEPAD_RIGHT_KEY : NOTEPAD_LEFT_KEY;
        const textareaId = side === 'right' ? 'notepadTextarea' : 'notepadTextareaLeft';
        const textarea = document.getElementById(textareaId);
        
        if (textarea) {
            const savedContent = localStorage.getItem(storageKey);
            if (savedContent) {
                textarea.value = savedContent;
            }
        }
    } catch (e) {
        console.error(`Error loading ${side} notepad:`, e);
    }
}

/**
 * Save notepad content
 */
function saveNotepadContentDual(side = 'right') {
    try {
        const storageKey = side === 'right' ? NOTEPAD_RIGHT_KEY : NOTEPAD_LEFT_KEY;
        const textareaId = side === 'right' ? 'notepadTextarea' : 'notepadTextareaLeft';
        const textarea = document.getElementById(textareaId);
        
        if (textarea) {
            localStorage.setItem(storageKey, textarea.value);
        }
    } catch (e) {
        console.error(`Error saving ${side} notepad:`, e);
    }
}

/**
 * Update notepad count
 */
function updateNotepadCountDual(side = 'right') {
    const textareaId = side === 'right' ? 'notepadTextarea' : 'notepadTextareaLeft';
    const textarea = document.getElementById(textareaId);
    if (!textarea) return;
    
    const text = textarea.value;
    const charCount = text.length;
    
    if (side === 'right') {
        const charDisplay = document.getElementById('charCount');
        if (charDisplay) charDisplay.textContent = `${charCount}/500`;
        
        const totalDisplay = document.getElementById('totalWordsCount');
        if (totalDisplay) totalDisplay.textContent = charCount;
        
        const badge = document.getElementById('notepadBadgeRight') || document.querySelector('.notepad-container.right-notepad .badge');
        if (badge) {
            if (charCount > 0) {
                badge.textContent = charCount;
                badge.classList.remove('hidden');
            } else {
                badge.classList.add('hidden');
            }
        }
    } else {
        const charDisplay = document.getElementById('charCountLeft');
        if (charDisplay) charDisplay.textContent = `${charCount}/500`;
        
        const totalDisplay = document.getElementById('totalCharsLeft');
        if (totalDisplay) totalDisplay.textContent = charCount;
        
        const badge = document.getElementById('notepadBadgeLeft');
        if (badge) {
            if (charCount > 0) {
                badge.textContent = charCount;
                badge.classList.remove('hidden');
            } else {
                badge.classList.add('hidden');
            }
        }
    }
    
    saveNotepadContentDual(side);
    updateSelectedCountDual(side);
}

/**
 * Update selected count
 */
function updateSelectedCountDual(side = 'right') {
    const textareaId = side === 'right' ? 'notepadTextarea' : 'notepadTextareaLeft';
    const textarea = document.getElementById(textareaId);
    if (!textarea) return;
    
    const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
    const selectedChars = selectedText.length;
    
    if (side === 'right') {
        const selectedDisplay = document.getElementById('selectedWordsCount');
        if (selectedDisplay) selectedDisplay.textContent = selectedChars;
    } else {
        const selectedDisplay = document.getElementById('selectedCharsLeft');
        if (selectedDisplay) selectedDisplay.textContent = selectedChars;
    }
}

/**
 * Clear notepad
 */
function clearNotepadDual(side = 'right') {
    if (confirm(`Clear all text from ${side} notepad?`)) {
        const textareaId = side === 'right' ? 'notepadTextarea' : 'notepadTextareaLeft';
        const textarea = document.getElementById(textareaId);
        if (textarea) {
            textarea.value = '';
            updateNotepadCountDual(side);
        }
    }
}

/**
 * Copy notepad content
 */
function copyNotepadDual(side = 'right') {
    const textareaId = side === 'right' ? 'notepadTextarea' : 'notepadTextareaLeft';
    const textarea = document.getElementById(textareaId);
    if (!textarea) return;
    
    const text = textarea.value;
    
    if (!text || text.trim() === '') {
        alert('Notepad is empty. Nothing to copy.');
        return;
    }
    
    textarea.select();
    textarea.setSelectionRange(0, text.length);
    
    try {
        const success = document.execCommand('copy');
        if (success) {
            const copyBtn = side === 'right' 
                ? document.querySelector('.notepad-container.right-notepad .notepad-btn.copy')
                : document.querySelector('.notepad-container.left-notepad .notepad-btn.copy');
            
            if (copyBtn) {
                const originalHtml = copyBtn.innerHTML;
                copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                setTimeout(() => {
                    copyBtn.innerHTML = originalHtml;
                }, 1500);
            }
            textarea.setSelectionRange(0, 0);
        }
    } catch (err) {
        const temp = document.createElement('textarea');
        temp.value = text;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
    }
}

/**
 * Initialize dual notepads
 */
function initDualNotepads() {
    // Create left notepad
    createLeftNotepad();
    
    // Small delay to ensure DOM is updated
    setTimeout(() => {
        // Load content for both
        loadNotepadContentDual('right');
        loadNotepadContentDual('left');
        updateNotepadCountDual('right');
        updateNotepadCountDual('left');
        
        // Add event listeners
        const rightTextarea = document.getElementById('notepadTextarea');
        const leftTextarea = document.getElementById('notepadTextareaLeft');
        
        if (rightTextarea) {
            rightTextarea.addEventListener('mouseup', () => updateSelectedCountDual('right'));
            rightTextarea.addEventListener('keyup', () => updateSelectedCountDual('right'));
            rightTextarea.addEventListener('blur', () => saveNotepadContentDual('right'));
        }
        
        if (leftTextarea) {
            leftTextarea.addEventListener('mouseup', () => updateSelectedCountDual('left'));
            leftTextarea.addEventListener('keyup', () => updateSelectedCountDual('left'));
            leftTextarea.addEventListener('blur', () => saveNotepadContentDual('left'));
        }
        
        console.log('✅ Dual notepads initialized');
    }, 100);
}