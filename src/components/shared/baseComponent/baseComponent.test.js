import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';
import { BaseComponent } from './baseComponent';

describe('Test suite for the BaseComponent class', () => {
  let baseComponent;
  let baseComponentWithShadow;

  const getComponent = (withShadowDom = false) => (withShadowDom ? baseComponentWithShadow : baseComponent);

  const consoleMock = vi.spyOn(console, 'warn');

  beforeAll(() => {
    window.customElements.define('base-component', BaseComponent);
    document.body.innerHTML = '';
  });

  beforeEach(() => {
    baseComponent = new BaseComponent('div');
    document.body.appendChild(baseComponent);

    baseComponentWithShadow = new BaseComponent('div', true);
    document.body.appendChild(baseComponentWithShadow);
  });

  afterEach(() => {
    document.body.removeChild(baseComponent);
    document.body.removeChild(baseComponentWithShadow);
    consoleMock.mockReset();
  });

  it('Should throw error if invalid HTML element is provided', () => {
    expect(() => new BaseComponent()).toThrow('Define a valid HTML element to create');
  });

  describe('Should validate a shadowDOM instance', () => {
    it('Without shadow DOM', () => {
      expect(getComponent().shadowRoot).toBeNull();
    });

    it('With shadow DOM', () => {
      expect(getComponent(true).shadowRoot).not.toBeNull();
    });
  });

  describe('Should create a valid HTML element', () => {
    it('Without shadow DOM', () => {
      expect(getComponent().render()).toBeInstanceOf(HTMLDivElement);
    });

    it('With shadow DOM', () => {
      expect(getComponent(true).render()).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('Should set ID of the element', () => {
    it('Without shadow DOM', () => {
      getComponent().setId('test-id');
      expect(getComponent().render().id).toBe('test-id');
    });

    it('With shadow DOM', () => {
      getComponent(true).setId('test-id');
      expect(getComponent(true).render().id).toBe('test-id');
    });
  });

  describe('Should remove ID from the element', () => {
    it('Without shadow DOM', () => {
      getComponent().setId('test-id');
      getComponent().removeId();
      expect(getComponent().render().id).toBe('');
    });

    it('With shadow DOM', () => {
      getComponent(true).setId('test-id');
      getComponent(true).removeId();
      expect(getComponent(true).render().id).toBe('');
    });
  });

  describe('Should pass axe accessibility tests', () => {
    it('Without shadow DOM', async () => {
      const results = await axe(baseComponent);
      expect(results).toHaveNoViolations();
    });

    it('With shadow DOM', async () => {
      const results = await axe(getComponent(true));
      expect(results).toHaveNoViolations();
    });
  });

  describe('Should add class to the element', () => {
    it('Without shadow DOM', () => {
      getComponent().addClass('test-class');
      expect(getComponent().hasClass('test-class')).toBe(true);
    });

    it('With shadow DOM', () => {
      getComponent(true).addClass('test-class');
      expect(getComponent(true).hasClass('test-class')).toBe(true);
    });
  });

  describe('Should add multiple classes to the element', () => {
    it('Without shadow DOM', () => {
      getComponent().addClass(['test-class-1', 'test-class-2']);
      expect(getComponent().hasClass('test-class-1')).toBe(true);
      expect(getComponent().hasClass('test-class-2')).toBe(true);
    });

    it('With shadow DOM', () => {
      getComponent(true).addClass(['test-class-1', 'test-class-2']);
      expect(getComponent(true).hasClass('test-class-1')).toBe(true);
      expect(getComponent(true).hasClass('test-class-2')).toBe(true);
    });
  });

  describe('Should clear all classes from the element', () => {
    it('Without shadow DOM', () => {
      getComponent().addClass('test-class');
      getComponent().clearClasses();
      expect(getComponent().hasClass('test-class')).toBe(false);
    });

    it('With shadow DOM', () => {
      getComponent(true).addClass('test-class');
      getComponent(true).clearClasses();
      expect(getComponent(true).hasClass('test-class')).toBe(false);
    });
  });

  describe('Should check if the element has a class', () => {
    it('Without shadow DOM', () => {
      getComponent().addClass('test-class');
      expect(getComponent().hasClass('test-class')).toBe(true);
    });

    it('With shadow DOM', () => {
      getComponent(true).addClass('test-class');
      expect(getComponent(true).hasClass('test-class')).toBe(true);
    });
  });

  describe('Should get all classes of the element', () => {
    it('Without shadow DOM', () => {
      getComponent().addClass(['class-1', 'class-2']);
      expect(getComponent().getClasses().length).toBe(2);
    });

    it('With shadow DOM', () => {
      getComponent(true).addClass(['class-1', 'class-2']);
      expect(getComponent(true).getClasses().length).toBe(2);
    });
  });

  describe('Should remove a class from the element', () => {
    it('Without shadow DOM', () => {
      getComponent().addClass('test-class');
      getComponent().removeClass('test-class');
      expect(getComponent().hasClass('test-class')).toBe(false);
    });

    it('With shadow DOM', () => {
      getComponent(true).addClass('test-class');
      getComponent(true).removeClass('test-class');
      expect(getComponent(true).hasClass('test-class')).toBe(false);
    });
  });

  describe('Should replace a class on the element', () => {
    it('Without shadow DOM', () => {
      getComponent().addClass('old-class');
      getComponent().replaceClass('old-class', 'new-class');
      expect(getComponent().hasClass('old-class')).toBe(false);
      expect(getComponent().hasClass('new-class')).toBe(true);
    });

    it('With shadow DOM', () => {
      getComponent(true).addClass('old-class');
      getComponent(true).replaceClass('old-class', 'new-class');
      expect(getComponent(true).hasClass('old-class')).toBe(false);
      expect(getComponent(true).hasClass('new-class')).toBe(true);
    });
  });

  describe('Should toggle a class on the element', () => {
    it('Without shadow DOM', () => {
      getComponent().toggleClass('toggle-class');
      expect(getComponent().hasClass('toggle-class')).toBe(true);
      getComponent().toggleClass('toggle-class');
      expect(getComponent().hasClass('toggle-class')).toBe(false);
    });

    it('With shadow DOM', () => {
      getComponent(true).toggleClass('toggle-class');
      expect(getComponent(true).hasClass('toggle-class')).toBe(true);
      getComponent(true).toggleClass('toggle-class');
      expect(getComponent(true).hasClass('toggle-class')).toBe(false);
    });
  });

  describe('Should check if the element has an attribute', () => {
    it('Without shadow DOM', () => {
      getComponent().setAttribute('data-attr', 'value');
      expect(getComponent().hasAttribute('data-attr')).toBe(true);
    });
    it('With shadow DOM', () => {
      getComponent(true).setAttribute('data-attr', 'value');
      expect(getComponent(true).hasAttribute('data-attr')).toBe(true);
    });
  });

  describe('Should get the value of an attribute', () => {
    it('Without shadow DOM', () => {
      getComponent().setAttribute('data-attr', 'value');
      expect(getComponent().getAttributeValue('data-attr')).toBe('value');
    });

    it('With shadow DOM', () => {
      getComponent(true).setAttribute('data-attr', 'value');
      expect(getComponent(true).getAttributeValue('data-attr')).toBe('value');
    });
  });

  describe('Should set an attribute on the element', () => {
    it('Without shadow DOM', () => {
      getComponent().setAttribute('data-attr', 'value');
      expect(getComponent().getAttributeValue('data-attr')).toBe('value');
    });

    it('With shadow DOM', () => {
      getComponent(true).setAttribute('data-attr', 'value');
      expect(getComponent(true).getAttributeValue('data-attr')).toBe('value');
    });
  });

  describe('Should remove an attribute from the element', () => {
    it('Without shadow DOM', () => {
      getComponent().setAttribute('data-attr', 'value');
      getComponent().removeAttribute('data-attr');
      expect(getComponent().hasAttribute('data-attr')).toBe(false);
    });

    it('With shadow DOM', () => {
      getComponent(true).setAttribute('data-attr', 'value');
      getComponent(true).removeAttribute('data-attr');
      expect(getComponent(true).hasAttribute('data-attr')).toBe(false);
    });
  });

  describe('Should add custom styles to the element', () => {
    it('Without shadow DOM', () => {
      const styles = 'color: blue; font-size: 16px;';
      getComponent().addStyles(styles);

      expect(getComponent().shadowRoot).toBeNull();
      expect(consoleMock).toBeCalledWith('Shadow DOM is not enabled. Styles cannot be added.');
    });

    it('With shadow DOM', () => {
      const styles = 'color: blue; font-size: 16px;';
      getComponent(true).addStyles(styles);
      const styleElement = getComponent(true).shadowRoot.querySelector('style');
      expect(styleElement.textContent).toBe(styles);
    });
  });

  describe('Should add a link to an external stylesheet to the element', () => {
    it('Without shadow DOM', () => {
      const href = 'path/to/styles.css';
      getComponent().addStyleSheet(href);

      expect(getComponent().shadowRoot).toBeNull();
      expect(consoleMock).toBeCalledWith('Shadow DOM is not enabled. Stylesheets cannot be added.');
    });

    it('With shadow DOM', () => {
      const href = 'path/to/styles.css';
      getComponent(true).addStyleSheet(href);
      const linkElement = getComponent(true).shadowRoot.querySelector('link');
      expect(linkElement.getAttribute('rel')).toBe('stylesheet');
      expect(linkElement.getAttribute('href')).toBe(href);
    });
  });

  describe('Should insert innerHTML on component', () => {
    it('Without shadow DOM', () => {
      const innerHTML = '<p>Hello, world!</p>';
      getComponent().setInnerHTML(innerHTML);

      expect(getComponent().render().innerHTML).toBe(innerHTML);
    });

    it('With shadow DOM', () => {
      const innerHTML = '<p>Hello, world!</p>';
      getComponent(true).setInnerHTML(innerHTML);

      expect(getComponent(true).shadowRoot.innerHTML).toBe(innerHTML);
    });
  });

  describe('Should append a new child node to the main element', () => {
    it('Without shadow DOM', () => {
      const component = getComponent();
      const newElement = document.createElement('span');
      newElement.textContent = 'New content';
      component.setAppendChild(newElement);

      expect(component._element.contains(newElement)).toBe(true);
      expect(component._element.querySelector('span').textContent).toBe('New content');
    });

    it('With shadow DOM', () => {
      const component = getComponent(true);
      const newElement = document.createElement('span');
      newElement.textContent = 'New content';
      component.setAppendChild(newElement);

      expect(component._element.contains(newElement)).toBe(true);
      expect(component._element.querySelector('span').textContent).toBe('New content');
    });
  });
});
