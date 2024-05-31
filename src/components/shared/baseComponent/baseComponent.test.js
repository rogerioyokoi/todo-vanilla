import { afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { axe } from 'vitest-axe';
import { BaseComponent } from "./baseComponent";

describe('baseComponent', () => {

  let baseComponent;

  beforeAll(() => {
    window.customElements.define('base-component', BaseComponent);
    document.body.innerHTML = '';
  })

  beforeEach(() => {
    baseComponent = new BaseComponent('div');
    document.body.appendChild(baseComponent);
  });

  afterEach(() => {
    document.body.removeChild(baseComponent);
  });

  it('Should create a valid HTML element', () => {
    expect(baseComponent.get()).toBeInstanceOf(HTMLDivElement);
  });
  // @todo
  // Fix: test to catch a throw error.
  it.skip('Should throw error if invalid HTML element is provided', () => {
    expect(new BaseComponent()).toThrow('Define a valid HTML element to create');
  });

  it('Should set ID of the element', () => {
    baseComponent.setId('test-id');
    expect(baseComponent.get().id).toBe('test-id');
  });

  it('Should remove ID from the element', () => {
    baseComponent.setId('test-id');
    baseComponent.removeId();
    expect(baseComponent.get().id).toBe('');
  });

  it('Should pass axe accessibility tests', async () => {
    const results = await axe(baseComponent);
    expect(results).toHaveNoViolations();
  });

  it('Should add class to the element', () => {
    baseComponent.addClass('test-class');
    expect(baseComponent.hasClass('test-class')).toBe(true);
  });

  it('Should add multiple classes to the element', () => {
    baseComponent.addClass(['test-class-1', 'test-class-2']);
    expect(baseComponent.hasClass('test-class-1')).toBe(true);
    expect(baseComponent.hasClass('test-class-2')).toBe(true);
  });

  it('Should clear all classes from the element', () => {
    baseComponent.addClass('test-class');
    baseComponent.clearClasses();
    expect(baseComponent.hasClass('test-class')).toBe(false);
  });

  it('Should check if the element has a class', () => {
    baseComponent.addClass('test-class');
    expect(baseComponent.hasClass('test-class')).toBe(true);
  });

  it('Should get all classes of the element', () => {
    baseComponent.addClass(['class-1', 'class-2']);
    expect(baseComponent.getClasses().length).toBe(2);
  });

  it('Should remove a class from the element', () => {
    baseComponent.addClass('test-class');
    baseComponent.removeClass('test-class');
    expect(baseComponent.hasClass('test-class')).toBe(false);
  });

  it('Should replace a class on the element', () => {
    baseComponent.addClass('old-class');
    baseComponent.replaceClass('old-class', 'new-class');
    expect(baseComponent.hasClass('old-class')).toBe(false);
    expect(baseComponent.hasClass('new-class')).toBe(true);
  });

  it('Should toggle a class on the element', () => {
    baseComponent.toggleClass('toggle-class');
    expect(baseComponent.hasClass('toggle-class')).toBe(true);
    baseComponent.toggleClass('toggle-class');
    expect(baseComponent.hasClass('toggle-class')).toBe(false);
  });

  it('should check if the element has an attribute', () => {
    baseComponent.setAttribute('data-attr', 'value');
    expect(baseComponent.hasAttribute('data-attr')).toBe(true);
  });

  it('should get the value of an attribute', () => {
    baseComponent.setAttribute('data-attr', 'value');
    expect(baseComponent.getAttributeValue('data-attr')).toBe('value');
  });

  it('should set an attribute on the element', () => {
    baseComponent.setAttribute('data-attr', 'value');
    expect(baseComponent.getAttributeValue('data-attr')).toBe('value');
  });

  it('should remove an attribute from the element', () => {
    baseComponent.setAttribute('data-attr', 'value');
    baseComponent.removeAttribute('data-attr');
    expect(baseComponent.hasAttribute('data-attr')).toBe(false);
  });
});
