/**
 * Base class for creating custom HTML elements with common utility methods.
 *
 * @example
 * Example of usage:
 *
 * class MyComponent extends BaseComponent {
 *   constructor() {
 *     super('div');
 *     this.setId('my-component');
 *     this.addClass(['my-class', 'another-class']);
 *     this.setAttribute('data-example', 'value');
 *   }
 *
 *   connectedCallback() {
 *     console.log(this.hasClass('my-class')); // true
 *     console.log(this.getAttributeValue('data-example')); // 'value'
 *   }
 * }
 *
 * customElements.define('my-component', MyComponent);
 */
export class BaseComponent extends HTMLElement {
  /**
   * Creates an instance of BaseComponent.
   * @param {string} element - The HTML element to create.
   * @throws Will throw an error if the element is not defined.
   * @example
   * const myComponent = new MyComponent();
   */
  constructor(element) {
    super();
    if (!element) {
      throw new Error('Define a valid HTML element to create');
    }
    this._element = document.createElement(element);
  }

  /**
   * Returns the created element.
   * @returns {HTMLElement} The created HTML element.
   * @example
   * const element = myComponent.get();
   */
  get() {
    return this._element;
  }

  /**
   * Adds one or more class names to the element.
   * @param {string|string[]} className - The class name(s) to add.
   * @example
   * myComponent.addClass('new-class');
   * myComponent.addClass(['class1', 'class2']);
   */
  addClass(className) {
    if (typeof className === 'string') {
      this._element.classList.add(className);
    } else if (Array.isArray(className)) {
      this._element.classList.add(...className);
    }
  }

  /**
   * Clears all class names from the element.
   * @example
   * myComponent.clearClasses();
   */
  clearClasses() {
    this._element.className = '';
  }

  /**
   * Checks if the element has a specific class name.
   * @param {string} className - The class name to check.
   * @returns {boolean} True if the element has the class, false otherwise.
   * @example
   * const hasClass = myComponent.hasClass('my-class'); // true or false
   */
  hasClass(className) {
    return this._element.classList.contains(className);
  }

  /**
   * Gets all class names from the element.
   * @returns {DOMTokenList} The list of class names.
   * @example
   * const classes = myComponent.getClasses();
   */
  getClasses() {
    return this._element.classList;
  }

  /**
   * Removes a specific class name from the element.
   * @param {string} className - The class name to remove.
   * @example
   * myComponent.removeClass('old-class');
   */
  removeClass(className) {
    this._element.classList.remove(className);
  }

  /**
   * Replaces an old class name with a new class name on the element.
   * @param {string} oldClassName - The class name to be replaced.
   * @param {string} newClassName - The class name to replace with.
   * @example
   * myComponent.replaceClass('old-class', 'new-class');
   */
  replaceClass(oldClassName, newClassName) {
    this._element.classList.replace(oldClassName, newClassName);
  }

  /**
   * Toggles a specific class name on the element.
   * @param {string} className - The class name to toggle.
   * @example
   * myComponent.toggleClass('toggle-class');
   */
  toggleClass(className) {
    this._element.classList.toggle(className);
  }

  /**
   * Sets the ID of the element.
   * @param {string} id - The ID to set.
   * @example
   * myComponent.setId('my-id');
   */
  setId(id) {
    this._element.id = id;
  }

  /**
   * Removes the ID from the element.
   * @example
   * myComponent.removeId();
   */
  removeId() {
    this._element.removeAttribute('id');
  }

  /**
   * Checks if the element has a specific attribute.
   * @param {string} attrName - The attribute name to check.
   * @returns {boolean} True if the element has the attribute, false otherwise.
   * @example
   * const hasAttr = myComponent.hasAttribute('data-attr'); // true or false
   */
  hasAttribute(attrName) {
    return this._element.hasAttribute(attrName);
  }

  /**
   * Gets the value of a specific attribute from the element.
   * @param {string} attrName - The attribute name to get the value of.
   * @returns {string|null} The value of the attribute, or null if the attribute does not exist.
   * @example
   * const attrValue = myComponent.getAttributeValue('data-attr');
   */
  getAttributeValue(attrName) {
    return this._element.getAttribute(attrName);
  }

  /**
   * Sets a specific attribute on the element.
   * @param {string} attrName - The attribute name to set.
   * @param {string} attrValue - The value to set the attribute to.
   * @example
   * myComponent.setAttribute('data-attr', 'value');
   */
  setAttribute(attrName, attrValue) {
    this._element.setAttribute(attrName, attrValue);
  }

  /**
   * Removes a specific attribute from the element.
   * @param {string} attrName - The attribute name to remove.
   * @example
   * myComponent.removeAttribute('data-attr');
   */
  removeAttribute(attrName) {
    this._element.removeAttribute(attrName);
  }
}
