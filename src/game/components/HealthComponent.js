/* eslint-disable array-element-newline, no-loops/no-loops */
import * as Renderer from "game/Renderer";
import Component from "game/ecm/Component";
import Transform2DComponent from "game/components/Transform2DComponent";
import {createBufferInfoFromArrays} from "util/WebGLUtils";
import {mat4} from "gl-matrix";

const geometryBuffers = {};

export default class HealthComponent extends Component {
    constructor(parent, maxHealth, displayHealthBar, startHealth) {
        super(parent);
        this.transform2d = this.require(Transform2DComponent);
        this._maxHealth = maxHealth;
        this._health = startHealth || maxHealth;
        this._displayHealthBar = displayHealthBar;
        if(this._displayHealthBar)
            this._createVerticesAndBuffer();
    }

    update(dt) {
        super.update(dt);
        if(this.health <= 0)
            this._parent.setForDeletion();
    }

    render() {
        if(this._displayHealthBar) {
            const transform = mat4.create();
            mat4.copy(transform, this.transform2d.transform2d);
            transform[0] = 1;
            transform[1] = 0;
            transform[2] = 0;

            transform[4] = 0;
            transform[5] = 1;
            transform[6] = 0;

            transform[8] = 0;
            transform[9] = 0;
            transform[10] = 1;

            Renderer.queue({
                mode: Renderer.gl.TRIANGLES,
                program: "flatColor",
                bufferInfos: {
                    ...this.bufferInfos,
                    nbElements: 6 * this._health
                },
                uniforms: {
                    uColor: [0.0, 1.0, 0.0, 1.0]
                },
                transformMatrix: transform
            });
            Renderer.queue({
                mode: Renderer.gl.TRIANGLES,
                program: "flatColor",
                bufferInfos: {
                    ...this.bufferInfos,
                    nbElements: 6 * (this._maxHealth - this._health)
                },
                uniforms: {
                    uColor: [0.0, 0.0, 0.0, 1.0]
                },
                transformMatrix: transform,
                offset: 6 * this._health
            });
        }
    }

    set health(value) {
        this._health = Math.min(value, this._maxHealth);
    }

    get health() {
        return this._health;
    }

    _createVerticesAndBuffer() {
        const key = this._maxHealth + "";
        if(Object.prototype.hasOwnProperty.call(geometryBuffers, key)) {
            this.bufferInfos = geometryBuffers[key].bufferInfos;
            this.vertices = geometryBuffers[key].vertices;
        }
        else {
            const height = 0.2;
            const width = 3;
            const baseHeight = 2;
            const interval = width / this._maxHealth;
            this.vertices = [];
            for(let i = 0; i < width; i += interval) {
                this.vertices.push(i - width / 2);
                this.vertices.push(baseHeight + height);
                this.vertices.push(i - width / 2);
                this.vertices.push(baseHeight);
                this.vertices.push(i + interval - width / 2);
                this.vertices.push(baseHeight);

                this.vertices.push(i + interval - width / 2);
                this.vertices.push(baseHeight);
                this.vertices.push(i + interval - width / 2);
                this.vertices.push(baseHeight + height);
                this.vertices.push(i - width / 2);
                this.vertices.push(baseHeight + height);
            }

            this.bufferInfos = createBufferInfoFromArrays(Renderer.gl, {
                vertexPosition: {nbComponents: 2, data: this.vertices}
            });

            geometryBuffers[key] = {
                bufferInfos: this.bufferInfos,
                vertices: this.vertices
            };
        }
    }
}
