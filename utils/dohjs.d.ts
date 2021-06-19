declare module "dohjs" {
    import { Packet } from "dns-packet";
    import { RequestMethod, QType } from "./qtypes";
    export class DohResolver {
        constructor(nameserver_url: string);
        query(qname: string, qtype: QType = QType.A, method: RequestMethod = RequestMethod.POST, headers: Record<string, string> = null, timeout: number = null): Promise<Packet>
    }
    export function sendDohMsg(packet: Packet, url: string, method: RequestMethod, headers: Record<string, string> = null, timeout: number): Promise<Packet>;


    export function makeQuery(qname: string, qtype: string = "A"): Packet;

    export class MethodNotAllowedError extends Error { }
    export function isMethodAllowed(method: string): boolean;
    export function prettify(packet: Packet): any;
}