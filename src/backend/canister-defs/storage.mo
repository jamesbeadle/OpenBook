import Result "mo:base/Result";
import Timer "mo:base/Timer";
import Array "mo:base/Array";
import TrieMap "mo:base/TrieMap";
import Buffer "mo:base/Buffer";
import Iter "mo:base/Iter";
import Utilities "../utilities/Utilities";
import Cycles "mo:base/ExperimentalCycles";
import Environment "../utilities/Environment";

actor class _StorageCanister() {

    //Canister to store data as blobs
    //Maximum file size 2MB
    //If 400GB Stable and 3GB RAM then 100 Buckets at 1200 files at 2MB == 234.375GB
    let MAX_FILE_COUNT: Nat = 1200;

    type PrincipalId = Text;
    type FileId = Nat32;
    type BucketNumber = Nat8;
    type StorageBlob = {
        id: FileId;
        owner: PrincipalId;
        blob: Blob
    };


    type Error = {
        #NotFound;
        #AlreadyExists;
        #NotAuthorized;
        #NotAllowed;
        #DecodeError;
        #InvalidData;
    };

    private stable var activeBucketNumber: Nat8 = 1;
    private stable var canisterFull = false;
    private stable var nextFileId: FileId = 1;
    private stable var fileIdBucketIndex: [(FileId, BucketNumber)] = [];
    
    private stable var bucket1: [StorageBlob] = [];
    private stable var bucket2: [StorageBlob] = [];
    private stable var bucket3: [StorageBlob] = [];
    private stable var bucket4: [StorageBlob] = [];
    private stable var bucket5: [StorageBlob] = [];
    private stable var bucket6: [StorageBlob] = [];
    private stable var bucket7: [StorageBlob] = [];
    private stable var bucket8: [StorageBlob] = [];
    private stable var bucket9: [StorageBlob] = [];
    private stable var bucket10: [StorageBlob] = [];
    private stable var bucket11: [StorageBlob] = [];
    private stable var bucket12: [StorageBlob] = [];
    private stable var bucket13: [StorageBlob] = [];
    private stable var bucket14: [StorageBlob] = [];
    private stable var bucket15: [StorageBlob] = [];
    private stable var bucket16: [StorageBlob] = [];
    private stable var bucket17: [StorageBlob] = [];
    private stable var bucket18: [StorageBlob] = [];
    private stable var bucket19: [StorageBlob] = [];
    private stable var bucket20: [StorageBlob] = [];
    private stable var bucket21: [StorageBlob] = [];
    private stable var bucket22: [StorageBlob] = [];
    private stable var bucket23: [StorageBlob] = [];
    private stable var bucket24: [StorageBlob] = [];
    private stable var bucket25: [StorageBlob] = [];
    private stable var bucket26: [StorageBlob] = [];
    private stable var bucket27: [StorageBlob] = [];
    private stable var bucket28: [StorageBlob] = [];
    private stable var bucket29: [StorageBlob] = [];
    private stable var bucket30: [StorageBlob] = [];
    private stable var bucket31: [StorageBlob] = [];
    private stable var bucket32: [StorageBlob] = [];
    private stable var bucket33: [StorageBlob] = [];
    private stable var bucket34: [StorageBlob] = [];
    private stable var bucket35: [StorageBlob] = [];
    private stable var bucket36: [StorageBlob] = [];
    private stable var bucket37: [StorageBlob] = [];
    private stable var bucket38: [StorageBlob] = [];
    private stable var bucket39: [StorageBlob] = [];
    private stable var bucket40: [StorageBlob] = [];
    private stable var bucket41: [StorageBlob] = [];
    private stable var bucket42: [StorageBlob] = [];
    private stable var bucket43: [StorageBlob] = [];
    private stable var bucket44: [StorageBlob] = [];
    private stable var bucket45: [StorageBlob] = [];
    private stable var bucket46: [StorageBlob] = [];
    private stable var bucket47: [StorageBlob] = [];
    private stable var bucket48: [StorageBlob] = [];
    private stable var bucket49: [StorageBlob] = [];
    private stable var bucket50: [StorageBlob] = [];
    private stable var bucket51: [StorageBlob] = [];
    private stable var bucket52: [StorageBlob] = [];
    private stable var bucket53: [StorageBlob] = [];
    private stable var bucket54: [StorageBlob] = [];
    private stable var bucket55: [StorageBlob] = [];
    private stable var bucket56: [StorageBlob] = [];
    private stable var bucket57: [StorageBlob] = [];
    private stable var bucket58: [StorageBlob] = [];
    private stable var bucket59: [StorageBlob] = [];
    private stable var bucket60: [StorageBlob] = [];
    private stable var bucket61: [StorageBlob] = [];
    private stable var bucket62: [StorageBlob] = [];
    private stable var bucket63: [StorageBlob] = [];
    private stable var bucket64: [StorageBlob] = [];
    private stable var bucket65: [StorageBlob] = [];
    private stable var bucket66: [StorageBlob] = [];
    private stable var bucket67: [StorageBlob] = [];
    private stable var bucket68: [StorageBlob] = [];
    private stable var bucket69: [StorageBlob] = [];
    private stable var bucket70: [StorageBlob] = [];
    private stable var bucket71: [StorageBlob] = [];
    private stable var bucket72: [StorageBlob] = [];
    private stable var bucket73: [StorageBlob] = [];
    private stable var bucket74: [StorageBlob] = [];
    private stable var bucket75: [StorageBlob] = [];
    private stable var bucket76: [StorageBlob] = [];
    private stable var bucket77: [StorageBlob] = [];
    private stable var bucket78: [StorageBlob] = [];
    private stable var bucket79: [StorageBlob] = [];
    private stable var bucket80: [StorageBlob] = [];
    private stable var bucket81: [StorageBlob] = [];
    private stable var bucket82: [StorageBlob] = [];
    private stable var bucket83: [StorageBlob] = [];
    private stable var bucket84: [StorageBlob] = [];
    private stable var bucket85: [StorageBlob] = [];
    private stable var bucket86: [StorageBlob] = [];
    private stable var bucket87: [StorageBlob] = [];
    private stable var bucket88: [StorageBlob] = [];
    private stable var bucket89: [StorageBlob] = [];
    private stable var bucket90: [StorageBlob] = [];
    private stable var bucket91: [StorageBlob] = [];
    private stable var bucket92: [StorageBlob] = [];
    private stable var bucket93: [StorageBlob] = [];
    private stable var bucket94: [StorageBlob] = [];
    private stable var bucket95: [StorageBlob] = [];
    private stable var bucket96: [StorageBlob] = [];
    private stable var bucket97: [StorageBlob] = [];
    private stable var bucket98: [StorageBlob] = [];
    private stable var bucket99: [StorageBlob] = [];
    private stable var bucket100: [StorageBlob] = [];

    public shared func isCanisterFull() : async Bool {
        return canisterFull;
    };

    public func saveFile(owner: PrincipalId, blob: Blob) : async Result.Result<StorageBlob, Error> {
        
        if(canisterFull){
            return #err(#NotAllowed);
        };

        if(isActiveBucketFull()){
            activeBucketNumber += 1;
        };

        let storageBlob: StorageBlob = {
            id = nextFileId;
            owner = owner;
            blob = blob
        };

        switch(activeBucketNumber){
            case 1{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket1);
                fileBuffer.add(storageBlob);
                bucket1 := Buffer.toArray(fileBuffer);
            };
            case 2{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket2);
                fileBuffer.add(storageBlob);
                bucket2 := Buffer.toArray(fileBuffer);
            };
            case 3{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket3);
                fileBuffer.add(storageBlob);
                bucket3 := Buffer.toArray(fileBuffer);
            };
            case 4{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket4);
                fileBuffer.add(storageBlob);
                bucket4 := Buffer.toArray(fileBuffer);
            };
            case 5{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket5);
                fileBuffer.add(storageBlob);
                bucket5 := Buffer.toArray(fileBuffer);
            };
            case 6{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket6);
                fileBuffer.add(storageBlob);
                bucket6 := Buffer.toArray(fileBuffer);
            };
            case 7{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket7);
                fileBuffer.add(storageBlob);
                bucket7 := Buffer.toArray(fileBuffer);
            };
            case 8{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket8);
                fileBuffer.add(storageBlob);
                bucket8 := Buffer.toArray(fileBuffer);
            };
            case 9{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket9);
                fileBuffer.add(storageBlob);
                bucket9 := Buffer.toArray(fileBuffer);
            };
            case 10{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket10);
                fileBuffer.add(storageBlob);
                bucket10 := Buffer.toArray(fileBuffer);
            };
            case 11{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket11);
                fileBuffer.add(storageBlob);
                bucket11 := Buffer.toArray(fileBuffer);
            };
            case 12{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket12);
                fileBuffer.add(storageBlob);
                bucket12 := Buffer.toArray(fileBuffer);
            };
            case 13{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket13);
                fileBuffer.add(storageBlob);
                bucket13 := Buffer.toArray(fileBuffer);
            };
            case 14{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket14);
                fileBuffer.add(storageBlob);
                bucket14 := Buffer.toArray(fileBuffer);
            };
            case 15{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket15);
                fileBuffer.add(storageBlob);
                bucket15 := Buffer.toArray(fileBuffer);
            };
            case 16{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket16);
                fileBuffer.add(storageBlob);
                bucket16 := Buffer.toArray(fileBuffer);
            };
            case 17{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket17);
                fileBuffer.add(storageBlob);
                bucket17 := Buffer.toArray(fileBuffer);
            };
            case 18{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket18);
                fileBuffer.add(storageBlob);
                bucket18 := Buffer.toArray(fileBuffer);
            };
            case 19{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket19);
                fileBuffer.add(storageBlob);
                bucket19 := Buffer.toArray(fileBuffer);
            };
            case 20{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket20);
                fileBuffer.add(storageBlob);
                bucket20 := Buffer.toArray(fileBuffer);
            };
            case 21{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket21);
                fileBuffer.add(storageBlob);
                bucket21 := Buffer.toArray(fileBuffer);
            };
            case 22{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket22);
                fileBuffer.add(storageBlob);
                bucket22 := Buffer.toArray(fileBuffer);
            };
            case 23{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket23);
                fileBuffer.add(storageBlob);
                bucket23 := Buffer.toArray(fileBuffer);
            };
            case 24{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket24);
                fileBuffer.add(storageBlob);
                bucket24 := Buffer.toArray(fileBuffer);
            };
            case 25{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket25);
                fileBuffer.add(storageBlob);
                bucket25 := Buffer.toArray(fileBuffer);
            };
            case 26{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket26);
                fileBuffer.add(storageBlob);
                bucket26 := Buffer.toArray(fileBuffer);
            };
            case 27{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket27);
                fileBuffer.add(storageBlob);
                bucket27 := Buffer.toArray(fileBuffer);
            };
            case 28{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket28);
                fileBuffer.add(storageBlob);
                bucket28 := Buffer.toArray(fileBuffer);
            };
            case 29{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket29);
                fileBuffer.add(storageBlob);
                bucket29 := Buffer.toArray(fileBuffer);
            };
            case 30{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket30);
                fileBuffer.add(storageBlob);
                bucket30 := Buffer.toArray(fileBuffer);
            };
            case 31{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket31);
                fileBuffer.add(storageBlob);
                bucket31 := Buffer.toArray(fileBuffer);
            };
            case 32{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket32);
                fileBuffer.add(storageBlob);
                bucket32 := Buffer.toArray(fileBuffer);
            };
            case 33{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket33);
                fileBuffer.add(storageBlob);
                bucket33 := Buffer.toArray(fileBuffer);
            };
            case 34{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket34);
                fileBuffer.add(storageBlob);
                bucket34 := Buffer.toArray(fileBuffer);
            };
            case 35{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket35);
                fileBuffer.add(storageBlob);
                bucket35 := Buffer.toArray(fileBuffer);
            };
            case 36{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket36);
                fileBuffer.add(storageBlob);
                bucket36 := Buffer.toArray(fileBuffer);
            };
            case 37{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket37);
                fileBuffer.add(storageBlob);
                bucket37 := Buffer.toArray(fileBuffer);
            };
            case 38{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket38);
                fileBuffer.add(storageBlob);
                bucket38 := Buffer.toArray(fileBuffer);
            };
            case 39{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket39);
                fileBuffer.add(storageBlob);
                bucket39 := Buffer.toArray(fileBuffer);
            };
            case 40{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket40);
                fileBuffer.add(storageBlob);
                bucket40 := Buffer.toArray(fileBuffer);
            };
            case 41{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket41);
                fileBuffer.add(storageBlob);
                bucket41 := Buffer.toArray(fileBuffer);
            };
            case 42{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket42);
                fileBuffer.add(storageBlob);
                bucket42 := Buffer.toArray(fileBuffer);
            };
            case 43{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket43);
                fileBuffer.add(storageBlob);
                bucket43 := Buffer.toArray(fileBuffer);
            };
            case 44{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket44);
                fileBuffer.add(storageBlob);
                bucket44 := Buffer.toArray(fileBuffer);
            };
            case 45{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket45);
                fileBuffer.add(storageBlob);
                bucket45 := Buffer.toArray(fileBuffer);
            };
            case 46{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket46);
                fileBuffer.add(storageBlob);
                bucket46 := Buffer.toArray(fileBuffer);
            };
            case 47{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket47);
                fileBuffer.add(storageBlob);
                bucket47 := Buffer.toArray(fileBuffer);
            };
            case 48{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket48);
                fileBuffer.add(storageBlob);
                bucket48 := Buffer.toArray(fileBuffer);
            };
            case 49{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket49);
                fileBuffer.add(storageBlob);
                bucket49 := Buffer.toArray(fileBuffer);
            };
            case 50{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket50);
                fileBuffer.add(storageBlob);
                bucket50 := Buffer.toArray(fileBuffer);
            };
            case 51{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket51);
                fileBuffer.add(storageBlob);
                bucket51 := Buffer.toArray(fileBuffer);
            };
            case 52{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket52);
                fileBuffer.add(storageBlob);
                bucket52 := Buffer.toArray(fileBuffer);
            };
            case 53{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket53);
                fileBuffer.add(storageBlob);
                bucket53 := Buffer.toArray(fileBuffer);
            };
            case 54{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket54);
                fileBuffer.add(storageBlob);
                bucket54 := Buffer.toArray(fileBuffer);
            };
            case 55{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket55);
                fileBuffer.add(storageBlob);
                bucket55 := Buffer.toArray(fileBuffer);
            };
            case 56{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket56);
                fileBuffer.add(storageBlob);
                bucket56 := Buffer.toArray(fileBuffer);
            };
            case 57{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket57);
                fileBuffer.add(storageBlob);
                bucket57 := Buffer.toArray(fileBuffer);
            };
            case 58{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket58);
                fileBuffer.add(storageBlob);
                bucket58 := Buffer.toArray(fileBuffer);
            };
            case 59{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket59);
                fileBuffer.add(storageBlob);
                bucket59 := Buffer.toArray(fileBuffer);
            };
            case 60{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket60);
                fileBuffer.add(storageBlob);
                bucket60 := Buffer.toArray(fileBuffer);
            };
            case 61{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket61);
                fileBuffer.add(storageBlob);
                bucket61 := Buffer.toArray(fileBuffer);
            };
            case 62{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket62);
                fileBuffer.add(storageBlob);
                bucket62 := Buffer.toArray(fileBuffer);
            };
            case 63{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket63);
                fileBuffer.add(storageBlob);
                bucket63 := Buffer.toArray(fileBuffer);
            };
            case 64{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket64);
                fileBuffer.add(storageBlob);
                bucket64 := Buffer.toArray(fileBuffer);
            };
            case 65{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket65);
                fileBuffer.add(storageBlob);
                bucket65 := Buffer.toArray(fileBuffer);
            };
            case 66{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket66);
                fileBuffer.add(storageBlob);
                bucket66 := Buffer.toArray(fileBuffer);
            };
            case 67{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket67);
                fileBuffer.add(storageBlob);
                bucket67 := Buffer.toArray(fileBuffer);
            };
            case 68{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket68);
                fileBuffer.add(storageBlob);
                bucket68 := Buffer.toArray(fileBuffer);
            };
            case 69{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket69);
                fileBuffer.add(storageBlob);
                bucket69 := Buffer.toArray(fileBuffer);
            };
            case 70{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket70);
                fileBuffer.add(storageBlob);
                bucket70 := Buffer.toArray(fileBuffer);
            };
            case 71{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket71);
                fileBuffer.add(storageBlob);
                bucket71 := Buffer.toArray(fileBuffer);
            };
            case 72{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket72);
                fileBuffer.add(storageBlob);
                bucket72 := Buffer.toArray(fileBuffer);
            };
            case 73{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket73);
                fileBuffer.add(storageBlob);
                bucket73 := Buffer.toArray(fileBuffer);
            };
            case 74{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket74);
                fileBuffer.add(storageBlob);
                bucket74 := Buffer.toArray(fileBuffer);
            };
            case 75{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket75);
                fileBuffer.add(storageBlob);
                bucket75 := Buffer.toArray(fileBuffer);
            };
            case 76{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket76);
                fileBuffer.add(storageBlob);
                bucket76 := Buffer.toArray(fileBuffer);
            };
            case 77{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket77);
                fileBuffer.add(storageBlob);
                bucket77 := Buffer.toArray(fileBuffer);
            };
            case 78{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket78);
                fileBuffer.add(storageBlob);
                bucket78 := Buffer.toArray(fileBuffer);
            };
            case 79{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket79);
                fileBuffer.add(storageBlob);
                bucket79 := Buffer.toArray(fileBuffer);
            };
            case 80{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket80);
                fileBuffer.add(storageBlob);
                bucket80 := Buffer.toArray(fileBuffer);
            };
            case 81{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket81);
                fileBuffer.add(storageBlob);
                bucket81 := Buffer.toArray(fileBuffer);
            };
            case 82{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket82);
                fileBuffer.add(storageBlob);
                bucket82 := Buffer.toArray(fileBuffer);
            };
            case 83{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket83);
                fileBuffer.add(storageBlob);
                bucket83 := Buffer.toArray(fileBuffer);
            };
            case 84{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket84);
                fileBuffer.add(storageBlob);
                bucket84 := Buffer.toArray(fileBuffer);
            };
            case 85{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket85);
                fileBuffer.add(storageBlob);
                bucket85 := Buffer.toArray(fileBuffer);
            };
            case 86{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket86);
                fileBuffer.add(storageBlob);
                bucket86 := Buffer.toArray(fileBuffer);
            };
            case 87{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket87);
                fileBuffer.add(storageBlob);
                bucket87 := Buffer.toArray(fileBuffer);
            };
            case 88{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket88);
                fileBuffer.add(storageBlob);
                bucket88 := Buffer.toArray(fileBuffer);
            };
            case 89{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket89);
                fileBuffer.add(storageBlob);
                bucket89 := Buffer.toArray(fileBuffer);
            };
            case 90{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket90);
                fileBuffer.add(storageBlob);
                bucket90 := Buffer.toArray(fileBuffer);
            };
            case 91{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket91);
                fileBuffer.add(storageBlob);
                bucket91 := Buffer.toArray(fileBuffer);
            };
            case 92{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket92);
                fileBuffer.add(storageBlob);
                bucket92 := Buffer.toArray(fileBuffer);
            };
            case 93{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket93);
                fileBuffer.add(storageBlob);
                bucket93 := Buffer.toArray(fileBuffer);
            };
            case 94{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket94);
                fileBuffer.add(storageBlob);
                bucket94 := Buffer.toArray(fileBuffer);
            };
            case 95{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket95);
                fileBuffer.add(storageBlob);
                bucket95 := Buffer.toArray(fileBuffer);
            };
            case 96{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket96);
                fileBuffer.add(storageBlob);
                bucket96 := Buffer.toArray(fileBuffer);
            };
            case 97{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket97);
                fileBuffer.add(storageBlob);
                bucket97 := Buffer.toArray(fileBuffer);
            };
            case 98{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket98);
                fileBuffer.add(storageBlob);
                bucket98 := Buffer.toArray(fileBuffer);
            };
            case 99{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket99);
                fileBuffer.add(storageBlob);
                bucket99 := Buffer.toArray(fileBuffer);
            };
            case 100{
                let fileBuffer = Buffer.fromArray<StorageBlob>(bucket100);
                fileBuffer.add(storageBlob);
                bucket100 := Buffer.toArray(fileBuffer);
            };
            case _ {};
        };
        
        let fileIdBucketIndexTrie: TrieMap.TrieMap<FileId, BucketNumber> = TrieMap.TrieMap<FileId, BucketNumber>(Utilities.eqNat32, Utilities.hashNat32);
  
        fileIdBucketIndexTrie.put(storageBlob.id, activeBucketNumber);

        fileIdBucketIndex := Iter.toArray(fileIdBucketIndexTrie.entries());

        if(activeBucketNumber == 100 and Array.size(bucket100) >= MAX_FILE_COUNT){
            canisterFull := true;
        };

        nextFileId += 1;

        return #err(#NotFound);
    };

    private func isActiveBucketFull() : Bool {
        switch(activeBucketNumber){
            case 1 { return Array.size(bucket1) > MAX_FILE_COUNT };
            case 2 { return Array.size(bucket2) > MAX_FILE_COUNT };
            case 3 { return Array.size(bucket3) > MAX_FILE_COUNT };
            case 4 { return Array.size(bucket4) > MAX_FILE_COUNT };
            case 5 { return Array.size(bucket5) > MAX_FILE_COUNT };
            case 6 { return Array.size(bucket6) > MAX_FILE_COUNT };
            case 7 { return Array.size(bucket7) > MAX_FILE_COUNT };
            case 8 { return Array.size(bucket8) > MAX_FILE_COUNT };
            case 9 { return Array.size(bucket9) > MAX_FILE_COUNT };
            case 10 { return Array.size(bucket10) > MAX_FILE_COUNT };
            case 11 { return Array.size(bucket11) > MAX_FILE_COUNT };
            case 12 { return Array.size(bucket12) > MAX_FILE_COUNT };
            case 13 { return Array.size(bucket13) > MAX_FILE_COUNT };
            case 14 { return Array.size(bucket14) > MAX_FILE_COUNT };
            case 15 { return Array.size(bucket15) > MAX_FILE_COUNT };
            case 16 { return Array.size(bucket16) > MAX_FILE_COUNT };
            case 17 { return Array.size(bucket17) > MAX_FILE_COUNT };
            case 18 { return Array.size(bucket18) > MAX_FILE_COUNT };
            case 19 { return Array.size(bucket19) > MAX_FILE_COUNT };
            case 20 { return Array.size(bucket20) > MAX_FILE_COUNT };
            case 21 { return Array.size(bucket21) > MAX_FILE_COUNT };
            case 22 { return Array.size(bucket22) > MAX_FILE_COUNT };
            case 23 { return Array.size(bucket23) > MAX_FILE_COUNT };
            case 24 { return Array.size(bucket24) > MAX_FILE_COUNT };
            case 25 { return Array.size(bucket25) > MAX_FILE_COUNT };
            case 26 { return Array.size(bucket26) > MAX_FILE_COUNT };
            case 27 { return Array.size(bucket27) > MAX_FILE_COUNT };
            case 28 { return Array.size(bucket28) > MAX_FILE_COUNT };
            case 29 { return Array.size(bucket29) > MAX_FILE_COUNT };
            case 30 { return Array.size(bucket30) > MAX_FILE_COUNT };
            case 31 { return Array.size(bucket31) > MAX_FILE_COUNT };
            case 32 { return Array.size(bucket32) > MAX_FILE_COUNT };
            case 33 { return Array.size(bucket33) > MAX_FILE_COUNT };
            case 34 { return Array.size(bucket34) > MAX_FILE_COUNT };
            case 35 { return Array.size(bucket35) > MAX_FILE_COUNT };
            case 36 { return Array.size(bucket36) > MAX_FILE_COUNT };
            case 37 { return Array.size(bucket37) > MAX_FILE_COUNT };
            case 38 { return Array.size(bucket38) > MAX_FILE_COUNT };
            case 39 { return Array.size(bucket39) > MAX_FILE_COUNT };
            case 40 { return Array.size(bucket40) > MAX_FILE_COUNT };
            case 41 { return Array.size(bucket41) > MAX_FILE_COUNT };
            case 42 { return Array.size(bucket42) > MAX_FILE_COUNT };
            case 43 { return Array.size(bucket43) > MAX_FILE_COUNT };
            case 44 { return Array.size(bucket44) > MAX_FILE_COUNT };
            case 45 { return Array.size(bucket45) > MAX_FILE_COUNT };
            case 46 { return Array.size(bucket46) > MAX_FILE_COUNT };
            case 47 { return Array.size(bucket47) > MAX_FILE_COUNT };
            case 48 { return Array.size(bucket48) > MAX_FILE_COUNT };
            case 49 { return Array.size(bucket49) > MAX_FILE_COUNT };
            case 50 { return Array.size(bucket50) > MAX_FILE_COUNT };
            case 51 { return Array.size(bucket51) > MAX_FILE_COUNT };
            case 52 { return Array.size(bucket52) > MAX_FILE_COUNT };
            case 53 { return Array.size(bucket53) > MAX_FILE_COUNT };
            case 54 { return Array.size(bucket54) > MAX_FILE_COUNT };
            case 55 { return Array.size(bucket55) > MAX_FILE_COUNT };
            case 56 { return Array.size(bucket56) > MAX_FILE_COUNT };
            case 57 { return Array.size(bucket57) > MAX_FILE_COUNT };
            case 58 { return Array.size(bucket58) > MAX_FILE_COUNT };
            case 59 { return Array.size(bucket59) > MAX_FILE_COUNT };
            case 60 { return Array.size(bucket60) > MAX_FILE_COUNT };
            case 61 { return Array.size(bucket61) > MAX_FILE_COUNT };
            case 62 { return Array.size(bucket62) > MAX_FILE_COUNT };
            case 63 { return Array.size(bucket63) > MAX_FILE_COUNT };
            case 64 { return Array.size(bucket64) > MAX_FILE_COUNT };
            case 65 { return Array.size(bucket65) > MAX_FILE_COUNT };
            case 66 { return Array.size(bucket66) > MAX_FILE_COUNT };
            case 67 { return Array.size(bucket67) > MAX_FILE_COUNT };
            case 68 { return Array.size(bucket68) > MAX_FILE_COUNT };
            case 69 { return Array.size(bucket69) > MAX_FILE_COUNT };
            case 70 { return Array.size(bucket70) > MAX_FILE_COUNT };
            case 71 { return Array.size(bucket71) > MAX_FILE_COUNT };
            case 72 { return Array.size(bucket72) > MAX_FILE_COUNT };
            case 73 { return Array.size(bucket73) > MAX_FILE_COUNT };
            case 74 { return Array.size(bucket74) > MAX_FILE_COUNT };
            case 75 { return Array.size(bucket75) > MAX_FILE_COUNT };
            case 76 { return Array.size(bucket76) > MAX_FILE_COUNT };
            case 77 { return Array.size(bucket77) > MAX_FILE_COUNT };
            case 78 { return Array.size(bucket78) > MAX_FILE_COUNT };
            case 79 { return Array.size(bucket79) > MAX_FILE_COUNT };
            case 80 { return Array.size(bucket80) > MAX_FILE_COUNT };
            case 81 { return Array.size(bucket81) > MAX_FILE_COUNT };
            case 82 { return Array.size(bucket82) > MAX_FILE_COUNT };
            case 83 { return Array.size(bucket83) > MAX_FILE_COUNT };
            case 84 { return Array.size(bucket84) > MAX_FILE_COUNT };
            case 85 { return Array.size(bucket85) > MAX_FILE_COUNT };
            case 86 { return Array.size(bucket86) > MAX_FILE_COUNT };
            case 87 { return Array.size(bucket87) > MAX_FILE_COUNT };
            case 88 { return Array.size(bucket88) > MAX_FILE_COUNT };
            case 89 { return Array.size(bucket89) > MAX_FILE_COUNT };
            case 90 { return Array.size(bucket90) > MAX_FILE_COUNT };
            case 91 { return Array.size(bucket91) > MAX_FILE_COUNT };
            case 92 { return Array.size(bucket92) > MAX_FILE_COUNT };
            case 93 { return Array.size(bucket93) > MAX_FILE_COUNT };
            case 94 { return Array.size(bucket94) > MAX_FILE_COUNT };
            case 95 { return Array.size(bucket95) > MAX_FILE_COUNT };
            case 96 { return Array.size(bucket96) > MAX_FILE_COUNT };
            case 97 { return Array.size(bucket97) > MAX_FILE_COUNT };
            case 98 { return Array.size(bucket98) > MAX_FILE_COUNT };
            case 99 { return Array.size(bucket99) > MAX_FILE_COUNT };
            case 100 { return Array.size(bucket100) > MAX_FILE_COUNT };
            case _ {};
        };
        return true;
    };

    public func getFile(fileId: FileId) : async Result.Result<StorageBlob, Error> {
        
        var bucketNumber: Nat8 = 0;

        let fileIdBucketIndexTrie: TrieMap.TrieMap<FileId, BucketNumber> = TrieMap.TrieMap<FileId, BucketNumber>(Utilities.eqNat32, Utilities.hashNat32);
  
        let index = fileIdBucketIndexTrie.get(fileId);

        switch(index){
            case (null){
                return #err(#NotFound);
            };
            case (?foundBucketNumber){
                bucketNumber := foundBucketNumber;
            };  
        };
        
        switch(bucketNumber){
            case 1{
                label fileLoop for(file in Iter.fromArray(bucket1)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 2{
                label fileLoop for(file in Iter.fromArray(bucket2)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 3{
                label fileLoop for(file in Iter.fromArray(bucket3)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 4{
                label fileLoop for(file in Iter.fromArray(bucket4)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 5{
                label fileLoop for(file in Iter.fromArray(bucket5)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 6{
                label fileLoop for(file in Iter.fromArray(bucket6)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 7{
                label fileLoop for(file in Iter.fromArray(bucket7)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 8{
                label fileLoop for(file in Iter.fromArray(bucket8)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 9{
                label fileLoop for(file in Iter.fromArray(bucket9)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 10{
                label fileLoop for(file in Iter.fromArray(bucket10)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 11{
                label fileLoop for(file in Iter.fromArray(bucket1)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 12{
                label fileLoop for(file in Iter.fromArray(bucket2)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 13{
                label fileLoop for(file in Iter.fromArray(bucket3)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 14{
                label fileLoop for(file in Iter.fromArray(bucket4)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 15{
                label fileLoop for(file in Iter.fromArray(bucket5)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 16{
                label fileLoop for(file in Iter.fromArray(bucket6)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 17{
                label fileLoop for(file in Iter.fromArray(bucket7)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 18{
                label fileLoop for(file in Iter.fromArray(bucket8)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 19{
                label fileLoop for(file in Iter.fromArray(bucket9)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 20{
                label fileLoop for(file in Iter.fromArray(bucket10)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 21{
                label fileLoop for(file in Iter.fromArray(bucket1)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 22{
                label fileLoop for(file in Iter.fromArray(bucket2)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 23{
                label fileLoop for(file in Iter.fromArray(bucket3)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 24{
                label fileLoop for(file in Iter.fromArray(bucket4)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 25{
                label fileLoop for(file in Iter.fromArray(bucket5)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 26{
                label fileLoop for(file in Iter.fromArray(bucket6)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 27{
                label fileLoop for(file in Iter.fromArray(bucket7)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 28{
                label fileLoop for(file in Iter.fromArray(bucket8)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 29{
                label fileLoop for(file in Iter.fromArray(bucket9)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 30{
                label fileLoop for(file in Iter.fromArray(bucket10)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 31{
                label fileLoop for(file in Iter.fromArray(bucket1)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 32{
                label fileLoop for(file in Iter.fromArray(bucket2)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 33{
                label fileLoop for(file in Iter.fromArray(bucket3)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 34{
                label fileLoop for(file in Iter.fromArray(bucket4)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 35{
                label fileLoop for(file in Iter.fromArray(bucket5)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 36{
                label fileLoop for(file in Iter.fromArray(bucket6)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 37{
                label fileLoop for(file in Iter.fromArray(bucket7)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 38{
                label fileLoop for(file in Iter.fromArray(bucket8)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 39{
                label fileLoop for(file in Iter.fromArray(bucket9)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 40{
                label fileLoop for(file in Iter.fromArray(bucket10)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 41{
                label fileLoop for(file in Iter.fromArray(bucket1)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 42{
                label fileLoop for(file in Iter.fromArray(bucket2)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 43{
                label fileLoop for(file in Iter.fromArray(bucket3)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 44{
                label fileLoop for(file in Iter.fromArray(bucket4)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 45{
                label fileLoop for(file in Iter.fromArray(bucket5)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 46{
                label fileLoop for(file in Iter.fromArray(bucket6)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 47{
                label fileLoop for(file in Iter.fromArray(bucket7)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 48{
                label fileLoop for(file in Iter.fromArray(bucket8)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 49{
                label fileLoop for(file in Iter.fromArray(bucket9)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 50{
                label fileLoop for(file in Iter.fromArray(bucket10)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 51{
                label fileLoop for(file in Iter.fromArray(bucket1)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 52{
                label fileLoop for(file in Iter.fromArray(bucket2)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 53{
                label fileLoop for(file in Iter.fromArray(bucket3)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 54{
                label fileLoop for(file in Iter.fromArray(bucket4)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 55{
                label fileLoop for(file in Iter.fromArray(bucket5)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 56{
                label fileLoop for(file in Iter.fromArray(bucket6)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 57{
                label fileLoop for(file in Iter.fromArray(bucket7)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 58{
                label fileLoop for(file in Iter.fromArray(bucket8)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 59{
                label fileLoop for(file in Iter.fromArray(bucket9)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 60{
                label fileLoop for(file in Iter.fromArray(bucket10)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 61{
                label fileLoop for(file in Iter.fromArray(bucket1)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 62{
                label fileLoop for(file in Iter.fromArray(bucket2)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 63{
                label fileLoop for(file in Iter.fromArray(bucket3)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 64{
                label fileLoop for(file in Iter.fromArray(bucket4)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 65{
                label fileLoop for(file in Iter.fromArray(bucket5)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 66{
                label fileLoop for(file in Iter.fromArray(bucket6)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 67{
                label fileLoop for(file in Iter.fromArray(bucket7)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 68{
                label fileLoop for(file in Iter.fromArray(bucket8)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 69{
                label fileLoop for(file in Iter.fromArray(bucket9)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 70{
                label fileLoop for(file in Iter.fromArray(bucket10)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 71{
                label fileLoop for(file in Iter.fromArray(bucket1)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 72{
                label fileLoop for(file in Iter.fromArray(bucket2)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 73{
                label fileLoop for(file in Iter.fromArray(bucket3)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 74{
                label fileLoop for(file in Iter.fromArray(bucket4)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 75{
                label fileLoop for(file in Iter.fromArray(bucket5)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 76{
                label fileLoop for(file in Iter.fromArray(bucket6)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 77{
                label fileLoop for(file in Iter.fromArray(bucket7)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 78{
                label fileLoop for(file in Iter.fromArray(bucket8)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 79{
                label fileLoop for(file in Iter.fromArray(bucket9)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 80{
                label fileLoop for(file in Iter.fromArray(bucket10)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 81{
                label fileLoop for(file in Iter.fromArray(bucket1)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 82{
                label fileLoop for(file in Iter.fromArray(bucket2)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 83{
                label fileLoop for(file in Iter.fromArray(bucket3)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 84{
                label fileLoop for(file in Iter.fromArray(bucket4)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 85{
                label fileLoop for(file in Iter.fromArray(bucket5)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 86{
                label fileLoop for(file in Iter.fromArray(bucket6)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 87{
                label fileLoop for(file in Iter.fromArray(bucket7)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 88{
                label fileLoop for(file in Iter.fromArray(bucket8)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 89{
                label fileLoop for(file in Iter.fromArray(bucket9)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 90{
                label fileLoop for(file in Iter.fromArray(bucket10)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 91{
                label fileLoop for(file in Iter.fromArray(bucket1)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 92{
                label fileLoop for(file in Iter.fromArray(bucket2)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 93{
                label fileLoop for(file in Iter.fromArray(bucket3)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 94{
                label fileLoop for(file in Iter.fromArray(bucket4)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 95{
                label fileLoop for(file in Iter.fromArray(bucket5)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 96{
                label fileLoop for(file in Iter.fromArray(bucket6)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 97{
                label fileLoop for(file in Iter.fromArray(bucket7)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 98{
                label fileLoop for(file in Iter.fromArray(bucket8)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 99{
                label fileLoop for(file in Iter.fromArray(bucket9)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case 100{
                label fileLoop for(file in Iter.fromArray(bucket10)){
                    if(file.id == fileId){
                        return #ok(file);
                        break fileLoop;
                    };
                };
            };
            case _ {};
        };
        return #err(#NotFound);
    };

    public func deleteFile(fileId: FileId) : async Result.Result<(), Error> {

        var bucketNumber: Nat8 = 0;

        let fileIdBucketIndexTrie: TrieMap.TrieMap<FileId, BucketNumber> = TrieMap.TrieMap<FileId, BucketNumber>(Utilities.eqNat32, Utilities.hashNat32);
  
        let index = fileIdBucketIndexTrie.get(fileId);

        switch(index){
            case (null){
                return #err(#NotFound);
            };
            case (?foundBucketNumber){
                bucketNumber := foundBucketNumber;
            };  
        };

        switch(bucketNumber){
            case 1{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket1)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket1 := Buffer.toArray(updatedFileBuffer);
            };
            case 2{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket2)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket2 := Buffer.toArray(updatedFileBuffer);
            };
            case 3{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket3)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket3 := Buffer.toArray(updatedFileBuffer);
            };
            case 4{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket4)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket4 := Buffer.toArray(updatedFileBuffer);
            };
            case 5{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket5)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket5 := Buffer.toArray(updatedFileBuffer);
            };
            case 6{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket6)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket6 := Buffer.toArray(updatedFileBuffer);
            };
            case 7{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket7)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket7 := Buffer.toArray(updatedFileBuffer);
            };
            case 8{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket8)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket8 := Buffer.toArray(updatedFileBuffer);
            };
            case 9{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket9)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket9 := Buffer.toArray(updatedFileBuffer);
            };
            case 10{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket10)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket10 := Buffer.toArray(updatedFileBuffer);
            };
            case 11{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket11)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket11 := Buffer.toArray(updatedFileBuffer);
            };
            case 12{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket12)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket12 := Buffer.toArray(updatedFileBuffer);
            };
            case 13{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket13)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket13 := Buffer.toArray(updatedFileBuffer);
            };
            case 14{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket14)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket14 := Buffer.toArray(updatedFileBuffer);
            };
            case 15{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket15)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket15 := Buffer.toArray(updatedFileBuffer);
            };
            case 16{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket16)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket16 := Buffer.toArray(updatedFileBuffer);
            };
            case 17{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket17)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket17 := Buffer.toArray(updatedFileBuffer);
            };
            case 18{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket18)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket18 := Buffer.toArray(updatedFileBuffer);
            };
            case 19{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket19)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket19 := Buffer.toArray(updatedFileBuffer);
            };
            case 20{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket20)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket20 := Buffer.toArray(updatedFileBuffer);
            };
            case 21{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket21)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket21 := Buffer.toArray(updatedFileBuffer);
            };
            case 22{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket22)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket22 := Buffer.toArray(updatedFileBuffer);
            };
            case 23{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket23)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket23 := Buffer.toArray(updatedFileBuffer);
            };
            case 24{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket24)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket24 := Buffer.toArray(updatedFileBuffer);
            };
            case 25{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket25)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket25 := Buffer.toArray(updatedFileBuffer);
            };
            case 26{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket26)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket26 := Buffer.toArray(updatedFileBuffer);
            };
            case 27{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket27)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket27 := Buffer.toArray(updatedFileBuffer);
            };
            case 28{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket28)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket28 := Buffer.toArray(updatedFileBuffer);
            };
            case 29{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket29)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket29 := Buffer.toArray(updatedFileBuffer);
            };
            case 30{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket30)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket30 := Buffer.toArray(updatedFileBuffer);
            };
            case 31{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket31)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket31 := Buffer.toArray(updatedFileBuffer);
            };
            case 32{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket32)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket32 := Buffer.toArray(updatedFileBuffer);
            };
            case 33{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket33)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket33 := Buffer.toArray(updatedFileBuffer);
            };
            case 34{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket34)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket34 := Buffer.toArray(updatedFileBuffer);
            };
            case 35{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket35)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket35 := Buffer.toArray(updatedFileBuffer);
            };
            case 36{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket36)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket36 := Buffer.toArray(updatedFileBuffer);
            };
            case 37{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket37)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket37 := Buffer.toArray(updatedFileBuffer);
            };
            case 38{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket38)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket38 := Buffer.toArray(updatedFileBuffer);
            };
            case 39{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket39)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket39 := Buffer.toArray(updatedFileBuffer);
            };
            case 40{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket40)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket40 := Buffer.toArray(updatedFileBuffer);
            };
            case 41{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket41)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket41 := Buffer.toArray(updatedFileBuffer);
            };
            case 42{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket42)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket42 := Buffer.toArray(updatedFileBuffer);
            };
            case 43{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket43)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket43 := Buffer.toArray(updatedFileBuffer);
            };
            case 44{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket44)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket44 := Buffer.toArray(updatedFileBuffer);
            };
            case 45{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket45)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket45 := Buffer.toArray(updatedFileBuffer);
            };
            case 46{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket46)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket46 := Buffer.toArray(updatedFileBuffer);
            };
            case 47{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket47)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket47 := Buffer.toArray(updatedFileBuffer);
            };
            case 48{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket48)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket48 := Buffer.toArray(updatedFileBuffer);
            };
            case 49{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket49)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket49 := Buffer.toArray(updatedFileBuffer);
            };
            case 50{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket50)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket50 := Buffer.toArray(updatedFileBuffer);
            };
            case 51{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket51)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket51 := Buffer.toArray(updatedFileBuffer);
            };
            case 52{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket52)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket52 := Buffer.toArray(updatedFileBuffer);
            };
            case 53{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket53)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket53 := Buffer.toArray(updatedFileBuffer);
            };
            case 54{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket54)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket54 := Buffer.toArray(updatedFileBuffer);
            };
            case 55{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket55)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket55 := Buffer.toArray(updatedFileBuffer);
            };
            case 56{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket56)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket56 := Buffer.toArray(updatedFileBuffer);
            };
            case 57{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket57)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket57 := Buffer.toArray(updatedFileBuffer);
            };
            case 58{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket58)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket58 := Buffer.toArray(updatedFileBuffer);
            };
            case 59{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket59)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket59 := Buffer.toArray(updatedFileBuffer);
            };
            case 60{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket60)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket60 := Buffer.toArray(updatedFileBuffer);
            };
            case 61{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket61)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket61 := Buffer.toArray(updatedFileBuffer);
            };
            case 62{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket62)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket62 := Buffer.toArray(updatedFileBuffer);
            };
            case 63{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket63)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket63 := Buffer.toArray(updatedFileBuffer);
            };
            case 64{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket64)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket64 := Buffer.toArray(updatedFileBuffer);
            };
            case 65{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket65)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket65 := Buffer.toArray(updatedFileBuffer);
            };
            case 66{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket66)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket66 := Buffer.toArray(updatedFileBuffer);
            };
            case 67{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket67)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket67 := Buffer.toArray(updatedFileBuffer);
            };
            case 68{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket68)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket68 := Buffer.toArray(updatedFileBuffer);
            };
            case 69{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket69)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket69 := Buffer.toArray(updatedFileBuffer);
            };
            case 70{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket70)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket70 := Buffer.toArray(updatedFileBuffer);
            };
            case 71{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket71)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket71 := Buffer.toArray(updatedFileBuffer);
            };
            case 72{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket72)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket72 := Buffer.toArray(updatedFileBuffer);
            };
            case 73{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket73)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket73 := Buffer.toArray(updatedFileBuffer);
            };
            case 74{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket74)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket74 := Buffer.toArray(updatedFileBuffer);
            };
            case 75{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket75)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket75 := Buffer.toArray(updatedFileBuffer);
            };
            case 76{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket76)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket76 := Buffer.toArray(updatedFileBuffer);
            };
            case 77{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket77)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket77 := Buffer.toArray(updatedFileBuffer);
            };
            case 78{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket78)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket78 := Buffer.toArray(updatedFileBuffer);
            };
            case 79{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket79)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket79 := Buffer.toArray(updatedFileBuffer);
            };
            case 80{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket80)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket80 := Buffer.toArray(updatedFileBuffer);
            };
            case 81{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket81)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket81 := Buffer.toArray(updatedFileBuffer);
            };
            case 82{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket82)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket82 := Buffer.toArray(updatedFileBuffer);
            };
            case 83{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket83)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket83 := Buffer.toArray(updatedFileBuffer);
            };
            case 84{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket84)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket84 := Buffer.toArray(updatedFileBuffer);
            };
            case 85{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket85)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket85 := Buffer.toArray(updatedFileBuffer);
            };
            case 86{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket86)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket86 := Buffer.toArray(updatedFileBuffer);
            };
            case 87{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket87)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket87 := Buffer.toArray(updatedFileBuffer);
            };
            case 88{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket88)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket88 := Buffer.toArray(updatedFileBuffer);
            };
            case 89{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket89)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket89 := Buffer.toArray(updatedFileBuffer);
            };
            case 90{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket90)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket90 := Buffer.toArray(updatedFileBuffer);
            };
            case 91{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket91)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket91 := Buffer.toArray(updatedFileBuffer);
            };
            case 92{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket92)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket92 := Buffer.toArray(updatedFileBuffer);
            };
            case 93{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket93)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket93 := Buffer.toArray(updatedFileBuffer);
            };
            case 94{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket94)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket94 := Buffer.toArray(updatedFileBuffer);
            };
            case 95{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket95)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket95 := Buffer.toArray(updatedFileBuffer);
            };
            case 96{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket96)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket96 := Buffer.toArray(updatedFileBuffer);
            };
            case 97{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket97)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket97 := Buffer.toArray(updatedFileBuffer);
            };
            case 98{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket98)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket98 := Buffer.toArray(updatedFileBuffer);
            };
            case 99{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket99)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket99 := Buffer.toArray(updatedFileBuffer);
            };
            case 100{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket100)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    };
                };
                bucket100 := Buffer.toArray(updatedFileBuffer);
            };
            case _ {};
        };

        return #ok;
    };

    public func updateFile(fileId: FileId, updatedFile: Blob) : async Result.Result<(), Error> {

        var bucketNumber: Nat8 = 0;

        let fileIdBucketIndexTrie: TrieMap.TrieMap<FileId, BucketNumber> = TrieMap.TrieMap<FileId, BucketNumber>(Utilities.eqNat32, Utilities.hashNat32);
  
        let index = fileIdBucketIndexTrie.get(fileId);

        switch(index){
            case (null){
                return #err(#NotFound);
            };
            case (?foundBucketNumber){
                bucketNumber := foundBucketNumber;
            };  
        };

        switch(bucketNumber){
            case 1{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket1)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket1 := Buffer.toArray(updatedFileBuffer);
            };
            case 2{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket2)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket2 := Buffer.toArray(updatedFileBuffer);
            };
            case 3{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket3)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket3 := Buffer.toArray(updatedFileBuffer);
            };
            case 4{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket4)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket4 := Buffer.toArray(updatedFileBuffer);
            };
            case 5{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket5)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket5 := Buffer.toArray(updatedFileBuffer);
            };
            case 6{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket6)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket6 := Buffer.toArray(updatedFileBuffer);
            };
            case 7{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket7)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket7 := Buffer.toArray(updatedFileBuffer);
            };
            case 8{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket8)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket8 := Buffer.toArray(updatedFileBuffer);
            };
            case 9{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket9)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket9 := Buffer.toArray(updatedFileBuffer);
            };
            case 10{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket10)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket10 := Buffer.toArray(updatedFileBuffer);
            };
            case 11{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket11)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket11 := Buffer.toArray(updatedFileBuffer);
            };
            case 12{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket12)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket12 := Buffer.toArray(updatedFileBuffer);
            };
            case 13{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket13)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket13 := Buffer.toArray(updatedFileBuffer);
            };
            case 14{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket14)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket14 := Buffer.toArray(updatedFileBuffer);
            };
            case 15{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket15)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket15 := Buffer.toArray(updatedFileBuffer);
            };
            case 16{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket16)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket16 := Buffer.toArray(updatedFileBuffer);
            };
            case 17{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket17)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket17 := Buffer.toArray(updatedFileBuffer);
            };
            case 18{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket18)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket18 := Buffer.toArray(updatedFileBuffer);
            };
            case 19{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket19)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket19 := Buffer.toArray(updatedFileBuffer);
            };
            case 20{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket20)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket20 := Buffer.toArray(updatedFileBuffer);
            };
            case 21{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket21)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket21 := Buffer.toArray(updatedFileBuffer);
            };
            case 22{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket22)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket22 := Buffer.toArray(updatedFileBuffer);
            };
            case 23{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket23)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket23 := Buffer.toArray(updatedFileBuffer);
            };
            case 24{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket24)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket24 := Buffer.toArray(updatedFileBuffer);
            };
            case 25{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket25)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket25 := Buffer.toArray(updatedFileBuffer);
            };
            case 26{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket26)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket26 := Buffer.toArray(updatedFileBuffer);
            };
            case 27{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket27)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket27 := Buffer.toArray(updatedFileBuffer);
            };
            case 28{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket28)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket28 := Buffer.toArray(updatedFileBuffer);
            };
            case 29{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket29)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket29 := Buffer.toArray(updatedFileBuffer);
            };
            case 30{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket30)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket30 := Buffer.toArray(updatedFileBuffer);
            };
            case 31{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket31)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket31 := Buffer.toArray(updatedFileBuffer);
            };
            case 32{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket32)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket32 := Buffer.toArray(updatedFileBuffer);
            };
            case 33{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket33)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket33 := Buffer.toArray(updatedFileBuffer);
            };
            case 34{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket34)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket34 := Buffer.toArray(updatedFileBuffer);
            };
            case 35{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket35)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket35 := Buffer.toArray(updatedFileBuffer);
            };
            case 36{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket36)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket36 := Buffer.toArray(updatedFileBuffer);
            };
            case 37{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket37)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket37 := Buffer.toArray(updatedFileBuffer);
            };
            case 38{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket38)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket38 := Buffer.toArray(updatedFileBuffer);
            };
            case 39{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket39)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket39 := Buffer.toArray(updatedFileBuffer);
            };
            case 40{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket40)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket40 := Buffer.toArray(updatedFileBuffer);
            };
            case 41{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket41)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket41 := Buffer.toArray(updatedFileBuffer);
            };
            case 42{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket42)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    }
                };
                bucket42 := Buffer.toArray(updatedFileBuffer);
            };
            case 43{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket43)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket43 := Buffer.toArray(updatedFileBuffer);
            };
            case 44{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket44)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket44 := Buffer.toArray(updatedFileBuffer);
            };
            case 45{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket45)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket45 := Buffer.toArray(updatedFileBuffer);
            };
            case 46{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket46)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket46 := Buffer.toArray(updatedFileBuffer);
            };
            case 47{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket47)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket47 := Buffer.toArray(updatedFileBuffer);
            };
            case 48{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket48)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket48 := Buffer.toArray(updatedFileBuffer);
            };
            case 49{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket49)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket49 := Buffer.toArray(updatedFileBuffer);
            };
            case 50{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket50)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket50 := Buffer.toArray(updatedFileBuffer);
            };
            case 51{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket51)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket51 := Buffer.toArray(updatedFileBuffer);
            };
            case 52{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket52)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket52 := Buffer.toArray(updatedFileBuffer);
            };
            case 53{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket53)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket53 := Buffer.toArray(updatedFileBuffer);
            };
            case 54{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket54)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket54 := Buffer.toArray(updatedFileBuffer);
            };
            case 55{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket55)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket55 := Buffer.toArray(updatedFileBuffer);
            };
            case 56{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket56)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket56 := Buffer.toArray(updatedFileBuffer);
            };
            case 57{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket57)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket57 := Buffer.toArray(updatedFileBuffer);
            };
            case 58{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket58)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket58 := Buffer.toArray(updatedFileBuffer);
            };
            case 59{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket59)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket59 := Buffer.toArray(updatedFileBuffer);
            };
            case 60{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket60)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket60 := Buffer.toArray(updatedFileBuffer);
            };
            case 61{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket61)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket61 := Buffer.toArray(updatedFileBuffer);
            };
            case 62{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket62)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket62 := Buffer.toArray(updatedFileBuffer);
            };
            case 63{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket63)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket63 := Buffer.toArray(updatedFileBuffer);
            };
            case 64{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket64)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket64 := Buffer.toArray(updatedFileBuffer);
            };
            case 65{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket65)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket65 := Buffer.toArray(updatedFileBuffer);
            };
            case 66{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket66)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket66 := Buffer.toArray(updatedFileBuffer);
            };
            case 67{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket67)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket67 := Buffer.toArray(updatedFileBuffer);
            };
            case 68{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket68)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket68 := Buffer.toArray(updatedFileBuffer);
            };
            case 69{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket69)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket69 := Buffer.toArray(updatedFileBuffer);
            };
            case 70{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket70)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket70 := Buffer.toArray(updatedFileBuffer);
            };
            case 71{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket71)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket71 := Buffer.toArray(updatedFileBuffer);
            };
            case 72{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket72)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket72 := Buffer.toArray(updatedFileBuffer);
            };
            case 73{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket73)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket73 := Buffer.toArray(updatedFileBuffer);
            };
            case 74{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket74)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket74 := Buffer.toArray(updatedFileBuffer);
            };
            case 75{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket75)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket75 := Buffer.toArray(updatedFileBuffer);
            };
            case 76{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket76)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket76 := Buffer.toArray(updatedFileBuffer);
            };
            case 77{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket77)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket77 := Buffer.toArray(updatedFileBuffer);
            };
            case 78{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket78)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket78 := Buffer.toArray(updatedFileBuffer);
            };
            case 79{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket79)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket79 := Buffer.toArray(updatedFileBuffer);
            };
            case 80{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket80)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket80 := Buffer.toArray(updatedFileBuffer);
            };
            case 81{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket81)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket81 := Buffer.toArray(updatedFileBuffer);
            };
            case 82{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket82)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket82 := Buffer.toArray(updatedFileBuffer);
            };
            case 83{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket83)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket83 := Buffer.toArray(updatedFileBuffer);
            };
            case 84{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket84)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket84 := Buffer.toArray(updatedFileBuffer);
            };
            case 85{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket85)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket85 := Buffer.toArray(updatedFileBuffer);
            };
            case 86{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket86)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket86 := Buffer.toArray(updatedFileBuffer);
            };
            case 87{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket87)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket87 := Buffer.toArray(updatedFileBuffer);
            };
            case 88{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket88)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket88 := Buffer.toArray(updatedFileBuffer);
            };
            case 89{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket89)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket89 := Buffer.toArray(updatedFileBuffer);
            };
            case 90{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket90)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket90 := Buffer.toArray(updatedFileBuffer);
            };
            case 91{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket91)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket91 := Buffer.toArray(updatedFileBuffer);
            };
            case 92{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket92)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket92 := Buffer.toArray(updatedFileBuffer);
            };
            case 93{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket93)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket93 := Buffer.toArray(updatedFileBuffer);
            };
            case 94{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket94)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket94 := Buffer.toArray(updatedFileBuffer);
            };
            case 95{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket95)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket95 := Buffer.toArray(updatedFileBuffer);
            };
            case 96{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket96)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket96 := Buffer.toArray(updatedFileBuffer);
            };
            case 97{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket97)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket97 := Buffer.toArray(updatedFileBuffer);
            };
            case 98{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket98)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket98 := Buffer.toArray(updatedFileBuffer);
            };
            case 99{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket99)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket99 := Buffer.toArray(updatedFileBuffer);
            };
            case 100{
                let updatedFileBuffer = Buffer.fromArray<StorageBlob>([]);
                for(file in Iter.fromArray(bucket100)){
                    if(file.id != fileId){
                        updatedFileBuffer.add(file);
                    } else {
                        updatedFileBuffer.add({blob = updatedFile; id = file.id; owner = file.owner});
                    };
                };
                bucket100 := Buffer.toArray(updatedFileBuffer);
            };
            case _ {};
        };

        return #ok;
    };
    
    system func preupgrade() {
    };

    system func postupgrade() {
      switch (cyclesCheckTimerId) {
        case (null) {};
        case (?id) {
          Timer.cancelTimer(id);
          cyclesCheckTimerId := null;
        };
      };
      cyclesCheckTimerId := ?Timer.setTimer<system>(#nanoseconds(cyclesCheckInterval), checkCanisterCycles);

    };

    private stable let cyclesCheckInterval : Nat = Utilities.getHour() * 24;
    private stable var cyclesCheckTimerId : ?Timer.TimerId = null;

    private func checkCanisterCycles() : async () {

      let balance = Cycles.balance();

      if (balance < 2_000_000_000_000) {
        let openfpl_backend_canister = actor (Environment.BACKEND_CANISTER_ID) : actor {
          requestCanisterTopup : () -> async ();
        };
        await openfpl_backend_canister.requestCanisterTopup();
      };
      await setCheckCyclesTimer();
    };

    private func setCheckCyclesTimer() : async () {
      switch (cyclesCheckTimerId) {
        case (null) {};
        case (?id) {
          Timer.cancelTimer(id);
          cyclesCheckTimerId := null;
        };
      };
      cyclesCheckTimerId := ?Timer.setTimer<system>(#nanoseconds(cyclesCheckInterval), checkCanisterCycles);
    };

    public func topupCanister() : async () {
      let amount = Cycles.available();
      let _ = Cycles.accept<system>(amount);
    };
};