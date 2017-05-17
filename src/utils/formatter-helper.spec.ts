import { getFileExtension, getFileName, truncateUrl } from './formatter-helper';

describe('FormatterHelper', () => {
    it('should extract file extension properly', () => {
        chai.expect(getFileExtension('model.ttl')).to.be.eql('ttl');
        chai.expect(getFileExtension('model.TTL')).to.be.eql('ttl');
        chai.expect(getFileExtension('model.2.ttl')).to.be.eql('ttl');
        chai.expect(getFileExtension('model...')).to.be.eql('');
        chai.expect(getFileExtension('model')).to.be.eql('');
        chai.expect(getFileExtension('')).to.be.eql('');
        chai.expect(getFileExtension(null as any)).to.be.eql('');
        chai.expect(getFileExtension(undefined as any)).to.be.eql('');
    })

    it('extracts filename properly', () => {
        const case1 = getFileName("kjgdf\rwewer\\test.pdf");
        chai.expect(case1).to.eql('test.pdf');

        const case2 = getFileName("kjgdf\\rwewer/test.pdf");
        chai.expect(case2).to.eql('test.pdf');

        const case3 = getFileName("kjgdf/rwewer\\test.pdf");
        chai.expect(case3).to.eql('test.pdf');

        const case4 = getFileName("test.pdf");
        chai.expect(case3).to.eql('test.pdf');
    })

    describe('truncateUrl', () => {
        it('truncates long urls', () => {
            const longUrl1 = "http://www.buildingsmart-tech.org/ifcowl/IFC4x1#IfcLengthMeasure";
            chai.expect(truncateUrl(longUrl1)).to.eql("http://www.buildingsmart-tech.org/.../IFC4x1#IfcLengthMeasure");
        })

        it('ignores short urls 1', () => {
            const longUrl1 = "http://example.org/1/";
            chai.expect(truncateUrl(longUrl1)).to.eql("http://example.org/1");
        })

        it('ignores short urls 1', () => {
            const longUrl1 = "http://example.org/1";
            chai.expect(truncateUrl(longUrl1)).to.eql(longUrl1);
        })

        it('truncates long urls 2', () => {
            const longUrl1 = "http://example.org/1/2";
            chai.expect(truncateUrl(longUrl1)).to.eql("http://example.org/.../2");
        })

        it('truncates long urls 3', () => {
            const longUrl1 = "http://example.org/1/2/3";
            chai.expect(truncateUrl(longUrl1)).to.eql("http://example.org/.../3");
        })

        it('truncates long urls 4', () => {
            const longUrl1 = "http://example.org/1/2/3/";
            chai.expect(truncateUrl(longUrl1)).to.eql("http://example.org/.../3");
        })

        it('ignores non urls', () => {
            const longUrl1 = "I am just text";
            chai.expect(truncateUrl(longUrl1)).to.eql(longUrl1);
        })
    })
})
