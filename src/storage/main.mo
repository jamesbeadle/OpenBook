import Result "mo:base/Result";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import TrieMap "mo:base/TrieMap";

actor Self {

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

    private var activeBucketNumber: Nat8 = 1;
    private var canisterFull = false;
    private var nextFileId: FileId = 1;
    private var fileIdBucketIndex: [(FileId, BucketNumber)] = [];
    
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

        //save file

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
            case _ {};
        };

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



    //get file
    public func getFile(bucketNumber: BucketNumber, fileId: FileId) : async Result.Result<StorageBlob, Error> {
        switch(bucketNumber){
            case 1{
                label fileLoop for(file in Iter.fromArray(bucket1)){
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

    //delete file

    //update file


  
  system func preupgrade() {
  };

  system func postupgrade() {

  };
};
