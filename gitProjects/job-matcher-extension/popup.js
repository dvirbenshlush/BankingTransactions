document.getElementById('saveBtn').addEventListener('click', async () => {
    const fileInput = document.getElementById('fileInput');
    const preferences = '90%'//document.getElementById('preferences').value;
  
    let resumeText = '';
  
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const fileExt = file.name.split('.').pop().toLowerCase();
  
      if (fileExt === 'pdf') {
        resumeText = await extractTextFromPDF(file);
      } else {
        alert('רק קבצי PDF נתמכים כרגע');
        return;
      }
    } else {
      alert('יש לבחור קובץ');
      return;
    }
  
    // שמור ל־chrome storage
    chrome.storage.local.set({ resume: resumeText, preferences }, () => {
      document.getElementById('status').textContent = 'נשמר בהצלחה!';
    });
    
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "runMatch" });
      });
  });
  
  async function extractTextFromPDF(file) {
    const arrayBuffer = await file.arrayBuffer();
    console.log("pdfjsLib:", window.pdfjsLib);

    const pdf = await window['pdfjsLib'].getDocument({ data: arrayBuffer }).promise;
  
    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const strings = content.items.map((item) => item.str);
      fullText += strings.join(' ') + '\n';
    }
    return fullText;
  }
  