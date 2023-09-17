import { switchLabelClass, log, isGroupActive, getGroupId, setActiveGroupId, loadAll, isVip } from '../initLoad';
import { hasClass, addStyle } from '../utils';



export function checkButtonAppended() {
  const switchEle = document.querySelector(`.${switchLabelClass}`);
  log('switchEle', switchEle);
  return !!switchEle
}

export function appendSwitch() {
  log('\n\n%c--------- appendSwitch ---------', 'background:yellow; color:blue; font-weight:600;');

  const did = checkButtonAppended()
  if (did) {
    // switchEle.remove();
    return;
  }

  const reGenerateButtonParant = document.querySelector(`.btn.relative.btn-neutral${''}`);
  const beforeNode = reGenerateButtonParant?.parentNode?.parentNode;
  const parent = beforeNode?.parentNode;


  // recommand: flex flex-col gap-3
  const recommands = parent?.childNodes || [];
  const lastRecommand = recommands[recommands?.length - 1]
  log('\n\n%c--------- recommands ---------', 'background:yellow; color:blue; font-weight:600;');
  log('recommands?.length', recommands?.length);
  log('lastRecommand', lastRecommand);

  if (lastRecommand
    && hasClass(lastRecommand, 'flex')
    && hasClass(lastRecommand, 'flex-col')
    && hasClass(lastRecommand, 'gap-3')
  ) {
    log('\n\n%c--------- lastRecommand ---------', 'background:yellow; color:blue; font-weight:600;');
    // 推荐问题，跳过
    return;
  }

  if (parent && beforeNode) {
    createSwitch(parent, beforeNode);
  }
}

export async function createSwitch(parent, beforeNode) {
  log('\n\n%c--------- createSwitch ---------', 'background:yellow; color:blue; font-weight:600;');

  // create the label element
  const label = document.createElement('label');
  label.setAttribute('for', 'toggle');
  label.classList.add(switchLabelClass);

  addStyle(label, {
    background: '#fff',
    userSelect: 'none',
    border: '1px solid rgba(0,0,0,0.1)',
    borderRadius: '4px',
  });
  label.classList.add('flex', 'items-center', 'cursor-pointer');

  // create the container div
  const switchContainer = document.createElement('div');
  switchContainer.classList.add('relative');

  // create the checkbox input element
  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.setAttribute('id', 'toggle');
  checkbox.classList.add('sr-only', 'form-checkbox');

  // create the switch background div
  const background = document.createElement('div');
  addStyle(background, { height: '1.25rem', background: 'rgba(86,88,105,1)' });
  background.classList.add('block', 'w-9', 'rounded-full');

  // create the dot element
  const dot = document.createElement('div');
  addStyle(dot, { top: '1.75px', left: '0.12rem' });
  dot.classList.add('dot', 'absolute', 'bg-white', 'w-4', 'h-4', 'rounded-full', 'transition');

  // create the label text
  const labelText = document.createTextNode('WindChat');
  const logoUrl = chrome.runtime.getURL('48.png');

  const labelTextNode = document.createElement('div');
  const img = document.createElement('img');

  // @ts-ignore
  img.src = logoUrl;
  addStyle(img, { width: '22px', height: '22px' });

  addStyle(labelTextNode, {
    gap: '5px',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    fontSize: '14px', color: '#40414f', paddingRight: '10px'
  });
  labelTextNode.appendChild(img);
  labelTextNode.appendChild(labelText);

  // append the elements to the label and container
  switchContainer.appendChild(checkbox);
  switchContainer.appendChild(background);
  switchContainer.appendChild(dot);

  const leftWrapper = document.createElement('div');

  addStyle(leftWrapper, {
    display: 'flex', gap: '5px', fontSize: '14px', color: '#40414f',
    paddingLeft: '0.5rem',
    paddingRight: '0.25rem',
    paddingTop: '6px',
    paddingBottom: '6px',
  });

  leftWrapper.appendChild(labelTextNode);
  leftWrapper.appendChild(switchContainer);

  label.appendChild(leftWrapper);

  function setSwitchState(active) {
    checkbox.checked = active;

    if (active) {
      addStyle(dot, { transform: 'translateX(100%)' });
      addStyle(background, { background: '#4f46e5' });
    } else {
      addStyle(dot, { transform: 'translateX(0)' });
      addStyle(background, { background: 'rgba(86,88,105,1)' });
    }
  }

  const active = await isGroupActive();

  setSwitchState(active);

  label.addEventListener('click', () => {
    log('\n\n%c--------- click ---------', 'background:yellow; color:blue; font-weight:600;');

    const newChecked = !checkbox.checked;
    log('newChecked', newChecked);

    setSwitchState(newChecked);

    setTimeout(() => {
      const id = getGroupId();
      if (newChecked) {
        setActiveGroupId(id, true);
        loadAll();
      } else {
        setActiveGroupId(id, false);
        window.location.reload();
      }
    }, 0);
  });

  const upgrade = document.createElement('a');
  const proBadge = document.createElement('div');
  proBadge.innerHTML = 'Pro';

  upgrade.setAttribute('target', '_blank');
  upgrade.setAttribute('href', 'https://www.windchat.link/#pricing');

  addStyle(upgrade, {
    paddingLeft: '0.25rem',
    paddingRight: '0.5rem',
    paddingTop: '5px',
    paddingBottom: '5px',
    display: 'block'
  });

  addStyle(proBadge, {
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
    paddingTop: '1px',
    paddingBottom: '1px',
    background: '#facc15',
    fontWeight: '600',
    color: '#fff',
    borderRadius: '6px'
  });
  upgrade.appendChild(proBadge);

  upgrade.addEventListener('click', (e) => {
    window.open('https://www.windchat.link', '_blank');

    e.preventDefault();
    e.stopPropagation();
  });

  const vip = await isVip();
  if (!vip) {
    label.appendChild(upgrade);
  }

  parent.insertBefore(label, beforeNode);
}
