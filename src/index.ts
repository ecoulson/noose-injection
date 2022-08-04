import { Module } from './module';
import { Annotation } from './annotation';
import { Injectable } from './injectable';
import { ModuleRegistry } from './module-registry';

const GlobalRegistry = new ModuleRegistry();

export { Module, Annotation, Injectable, ModuleRegistry, GlobalRegistry };
